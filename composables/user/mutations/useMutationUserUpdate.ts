import type { UseMutationOptions } from '@tanstack/vue-query';
import type { UserDto } from '~/models/dtos/UserDto';
import type { UserResponse } from '~/models/User';
import type { ErrorResponse } from '~/types';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';

export const useMutationUserUpdate = (
    id: MaybeRef<string>,
    options?: UseMutationOptions<
        UserResponse,
        ErrorResponse,
        UserDto,
        unknown
    >,
) => {
    const UserService = new UserServiceImpl();
    return useMutation({
        mutationFn: (data: UserDto) => UserService.updateUser(toValue(id), data),
        ...options,
    });
};
