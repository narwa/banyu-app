import type { UseQueryOptions } from '@tanstack/vue-query';
import type { GeneralConfigListResponse } from '~/models/GeneralConfig';
import type { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import type { GenericPagination } from '~/types';
import { useQuery } from '@tanstack/vue-query';
import { GeneralConfigServiceImpl } from '~/services/impl/GeneralConfigServiceImpl';

export const useQueryGeneralConfigList = (
    params: PaginationSearchParam,
    searchCount: MaybeRef<number>,
    options?: UseQueryOptions<GenericPagination<GeneralConfigListResponse[]>>,
) => {
    const generalConfigService = new GeneralConfigServiceImpl();
    const query = useQuery<GenericPagination<GeneralConfigListResponse[]>>({
        queryKey: ['general-config-list', params, searchCount],
        queryFn: () => generalConfigService.getGeneralConfigList(params),
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
