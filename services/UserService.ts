import type { UserDto } from '~/models/dtos/UserDto';
import type { UserPaginationSearchParams } from '~/models/params/UserPaginationSearchParams';
import type { UserDetail, UserListResponse, UserResponse } from '~/models/User';
import type { GenericPagination } from '~/types';

export type UserService = {
    getUserList: (params: UserPaginationSearchParams) => Promise<GenericPagination<UserListResponse[]>>;
    getUserDetail: (id: string) => Promise<UserDetail>;
    createUser: (data: UserDto) => Promise<UserResponse>;
    updateUser: (id: string, data: UserDto) => Promise<UserResponse>;
};
