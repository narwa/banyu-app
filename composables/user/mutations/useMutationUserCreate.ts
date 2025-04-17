import type { UseMutationOptions } from '@tanstack/vue-query';
import type { UserDto } from '~/models/dtos/UserDto';
import type { UserResponse } from '~/models/User';
import type { ErrorResponse } from '~/types';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';

export const useMutationUserCreate = (
    options?: UseMutationOptions<
        UserResponse,
        ErrorResponse,
        UserDto,
        unknown
    >,
) => {
    const userService = new UserServiceImpl();
    return useMutation({
        mutationFn: (data: UserDto) => userService.createUser(data),
        ...options,
    });
};
