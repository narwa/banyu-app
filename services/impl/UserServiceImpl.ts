import type { UserDto } from '~/models/dtos/UserDto';
import type { UserPaginationSearchParams } from '~/models/params/UserPaginationSearchParams';
import type { UserDetail, UserListResponse, UserResponse } from '~/models/User';
import type { UserService } from '~/services/UserService';
import type { GenericPagination } from '~/types';
import { useNuxtApp } from '#app';
import { UserEndpoint } from '~/endpoints/UserEndpoint';

export class UserServiceImpl implements UserService {
    async getUserList(params: UserPaginationSearchParams): Promise<GenericPagination<UserListResponse[]>> {
        return await useNuxtApp().$api<GenericPagination<UserListResponse[]>>(UserEndpoint.USER_LIST, {
            query: {
                ...params,
                page: params.page - 1,
            },
        });
    }

    async getUserDetail(key: string): Promise<UserDetail> {
        return await useNuxtApp().$api<UserDetail>(UserEndpoint.USER_DETAIL.replace('[key]', key));
    }

    createUser(data: UserDto): Promise<UserResponse> {
        return useNuxtApp().$api<UserResponse>(
            UserEndpoint.USER_CREATE,
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
            UserEndpoint.USER_UPDATE.replace('[id]', id),
            {
                method: 'PUT',
                body: {
                    ...data,
                },
            },
        );
    }
}
