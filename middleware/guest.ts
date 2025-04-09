import { navigateTo } from '#app';
import { useAuthStore } from '~/stores/useAuthStore';

export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();
    const isTokenExist: boolean = !!authStore.token;

    if (!isTokenExist)
        return;

    return navigateTo({ name: 'index' });
});
