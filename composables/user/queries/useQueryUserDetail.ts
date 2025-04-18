import type { UseMutationOptions } from '@tanstack/vue-query';
import type { UserDetailResponse } from '~/models/User';
import type { ErrorResponse } from '~/types';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';

export const useMutationGetUserDetail = (
    options?: UseMutationOptions<
        UserDetailResponse,
        ErrorResponse,
        {
            id: string;
        },
        unknown
    >,
) => {
    const userService = new UserServiceImpl();
    return useMutation({
        mutationFn: ({ id }) => userService.getUserDetail(id),
        ...options,
    });
};
