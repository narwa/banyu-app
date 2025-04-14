import { navigateTo } from '#app';
import { toast } from 'vue-sonner';
import { useMutationGetMeDetail } from '~/composables/me/queries/useQueryMeDetail';

export default defineNuxtRouteMiddleware(async () => {
    const authStore = useAuthStore();
    const { mutateAsync: getDetailProfile } = useMutationGetMeDetail();

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

    if (authStore.user?.userType === 'SUPER_ADMIN')
        return;

    return navigateTo({ name: 'index' });
});
