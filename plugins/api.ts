import { toast } from 'vue-sonner';
import { useAuthStore } from '~/stores/useAuthStore';

export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();
    const api = $fetch.create({
        baseURL: process.env.API_BASE_PATH,
        onRequest({ options }) {
            options.headers.set('Content-Type', 'application/json');
            options.headers.set('authorization', `Bearer ${authStore.token}`);
        },

        async onRequestError({ request }) {
            console.error(request);
            await nuxtApp.runWithContext(() => navigateTo({ name: 'index' }));
        },

        async onResponseError({ response }) {
            console.error(response);

            if (response.status === 401) {
                await nuxtApp.runWithContext(() => {
                    toast.error('Your session has expired. Please login again.');
                    return navigateTo('/login');
                });
            }
            else if (response.status === 403) {
                await nuxtApp.runWithContext(() =>
                    toast.error('You are not authorized to perform this action!'),
                );
            }
            else {
                await nuxtApp.runWithContext(() =>
                    toast.error('Something went wrong, please try again!'),
                );
            }
        },
    });

    return {
        provide: {
            api,
        },
    };
});
