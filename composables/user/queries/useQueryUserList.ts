import type { UseQueryOptions } from '@tanstack/vue-query';
import type { UserPaginationSearchParams } from '~/models/params/UserPaginationSearchParams';
import type { UserListResponse } from '~/models/User';
import type { GenericPagination } from '~/types';
import { useQuery } from '@tanstack/vue-query';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';

export const useQueryUserList = (
    params: UserPaginationSearchParams,
    searchCount: MaybeRef<number>,
    options?: UseQueryOptions<GenericPagination<UserListResponse[]>>,
) => {
    const userService = new UserServiceImpl();
    const query = useQuery<GenericPagination<UserListResponse[]>>({
        queryKey: ['user-list', params, searchCount],
        queryFn: () => userService.getUserList(params),
        ...options,
    });
    const total = computed(() => Number(query.data.value?.elements ?? 0));
    const results = computed(() =>
        query.data.value && Array.isArray(query.data.value.data) ? query.data.value.data : [],
    );
    const refetch = () => {
        if (params.page > 1)
            params.setFirstPage();
        else query.refetch();
    };
    return { ...query, results, total, refetch };
};
