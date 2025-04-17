import type { UseQueryOptions } from '@tanstack/vue-query';
import type { AreaListResponse } from '~/models/Area';
import type { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import type { GenericPagination } from '~/types';
import { useQuery } from '@tanstack/vue-query';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

export const useQueryAreaList = (
    params: PaginationSearchParam,
    searchCount: MaybeRef<number>,
    options?: UseQueryOptions<GenericPagination<AreaListResponse[]>>,
) => {
    const userService = new AreaServiceImpl();
    const query = useQuery<GenericPagination<AreaListResponse[]>>({
        queryKey: ['area-list', params, searchCount],
        queryFn: () => userService.getAreaList(params),
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
    const values = computed(() =>
        results.value.map(result => result.code),
    );
    return { ...query, results, total, values, refetch };
};
