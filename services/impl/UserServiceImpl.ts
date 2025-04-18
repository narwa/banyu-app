import type { UserDto } from '~/models/dtos/UserDto';
import type { UserPaginationSearchParams } from '~/models/params/UserPaginationSearchParams';
import type { UserDetailResponse, UserListResponse, UserResponse } from '~/models/User';
import type { UserService } from '~/services/UserService';
import type { GenericPagination } from '~/types';
import { useNuxtApp } from '#app';
import { UserEndpoint } from '~/endpoints/UserEndpoint';

export class UserServiceImpl implements UserService {
    async getUserList(params: UserPaginationSearchParams): Promise<GenericPagination<UserListResponse[]>> {
        return await useNuxtApp().$api<GenericPagination<UserListResponse[]>>(UserEndpoint.LIST, {
            query: {
                ...params,
                page: params.page - 1,
            },
        });
    }

    async getUserDetail(id: string): Promise<UserDetailResponse> {
        return await useNuxtApp().$api<UserDetailResponse>(UserEndpoint.DETAIL.replace('[id]', id));
    }

    createUser(data: UserDto): Promise<UserResponse> {
        return useNuxtApp().$api<UserResponse>(
            UserEndpoint.CREATE,
            {
                method: 'POST',
                body: {
                    ...data,
                },
            },
        );
    }

    updateUser(id: string, data: UserDto): Promise<UserResponse> {
        return useNuxtApp().$api<UserResponse>(
            UserEndpoint.UPDATE.replace('[id]', id),
            {
                method: 'PUT',
                body: {
                    ...data,
                },
            },
        );
    }

    deleteUser(id: string): Promise<UserResponse> {
        return useNuxtApp().$api<UserResponse>(
            UserEndpoint.DELETE.replace('[id]', id),
            {
                method: 'DELETE',
            },
        );
    }
}
