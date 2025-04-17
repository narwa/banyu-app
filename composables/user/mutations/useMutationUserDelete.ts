import type { UseMutationOptions } from '@tanstack/vue-query';
import type { UserResponse } from '~/models/User';
import type { ErrorResponse } from '~/types';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';

export const useMutationUserDelete = (
    options?: UseMutationOptions<
        UserResponse,
        ErrorResponse,
        string,
        unknown
    >,
) => {
    const UserService = new UserServiceImpl();
    return useMutation({
        mutationFn: (id: string) => UserService.deleteUser(toValue(id)),
        ...options,
    });
};
