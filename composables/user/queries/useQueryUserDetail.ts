import type { UseMutationOptions } from '@tanstack/vue-query';
import type { UserDetail } from '~/models/User';
import type { ErrorResponse } from '~/types';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';

export const useMutationGetUserDetail = (
    options?: UseMutationOptions<
        UserDetail,
        ErrorResponse,
        {
            userKey: string;
        },
        unknown
    >,
) => {
    const userService = new UserServiceImpl();
    return useMutation({
        mutationFn: ({ userKey }) => userService.getUserDetail(userKey),
        ...options,
    });
};
