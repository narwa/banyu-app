import { navigateTo } from '#app';
import { toast } from 'vue-sonner';
import { useMutationGetDetailProfile } from '~/composables/user/useMutationGetDetailProfile';

export default defineNuxtRouteMiddleware(async () => {
    const authStore = useAuthStore();
    const { mutateAsync: getDetailProfile } = useMutationGetDetailProfile();

    if (authStore.token && !authStore.user) {
        try {
            await getDetailProfile();
        }
        catch (error) {
            console.warn(error);
            toast.error('Your session has expired. Please login again.');
            authStore.logout();
            return navigateTo({ name: 'login' });
        }
    }

    if (authStore.user?.userType === 'ADMIN')
        return;

    return navigateTo({ name: 'index' });
});
