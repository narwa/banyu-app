import type { UseMutationOptions } from '@tanstack/vue-query';
import type { Me } from '~/models/Me';
import type { ErrorResponse } from '~/types';
import { MeServiceImpl } from '~/services/impl/MeServiceImpl';

export const useMutationGetMeDetail = (
    options?: UseMutationOptions<
        Me,
        ErrorResponse,
        void,
        unknown
    >,
) => {
    const authStore = useAuthStore();
    const meService = new MeServiceImpl();
    return useMutation({
        mutationFn: () => meService.getMe(),
        ...options,
        onSuccess: async (user) => {
            authStore.setUser({
                createdAt: user.createdAt,
                fullName: user.fullName,
                lastLogin: user.lastLogin,
                lastUpdateBy: user.lastUpdateBy,
                photoProfile: user.photoProfile,
                username: user.username,
                userType: user.userType,
                userTypeId: user.userTypeId,
                photo: user.photoProfile,
            });
        },
    });
};
