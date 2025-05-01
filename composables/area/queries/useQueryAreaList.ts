import type { UseQueryOptions } from '@tanstack/vue-query';
import type { AreaListResponse } from '~/models/Area';
import type { AreaPaginationSearchParams } from '~/models/params/AreaPaginationSearchParams';
import type { GenericPagination } from '~/types';
import { useQuery } from '@tanstack/vue-query';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

export const useQueryAreaList = (
    params: AreaPaginationSearchParams,
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
    return { ...query, results, total, refetch };
};
