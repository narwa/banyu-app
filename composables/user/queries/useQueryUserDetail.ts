import type { UseMutationOptions } from '@tanstack/vue-query';
import type { UserDetail } from '~/models/User';
import type { ErrorResponse } from '~/types';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';

export const useMutationGetUserDetail = (
    options?: UseMutationOptions<
        UserDetail,
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
