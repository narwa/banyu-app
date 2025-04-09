import type { UseMutationOptions } from '@tanstack/vue-query';
import type { User } from '~/models/User';
import type { ErrorResponse } from '~/types';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';

export const useMutationGetDetailProfile = (
    options?: UseMutationOptions<
        User,
        ErrorResponse,
        void,
        unknown
    >,
) => {
    const authStore = useAuthStore();
    const userService = new UserServiceImpl();
    return useMutation({
        mutationFn: () => userService.getDetailProfile(),
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
