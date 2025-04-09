import { navigateTo } from '#app';
import dayjs from '#build/dayjs.imports.mjs';
import { useJwt } from '@vueuse/integrations/useJwt';
import { useAuthStore } from '~/stores/useAuthStore';

export default defineNuxtRouteMiddleware(() => {
    const authStore = useAuthStore();
    const { payload } = useJwt(authStore.token);

    const isTokenExist: boolean = !!authStore.token;
    const isSessionActive: boolean = payload.value?.exp !== undefined && dayjs().unix() < payload.value.exp;

    if (isTokenExist && isSessionActive)
        return;

    authStore.setToken('');
    return navigateTo({ name: 'login' });
});
