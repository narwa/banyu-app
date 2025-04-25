import type { UseQueryOptions } from '@tanstack/vue-query';
import type { MeterReadingListResponse } from '~/models/MeterReading';
import type { MeterReadingPaginationSearchParams } from '~/models/params/MeterReadingPaginationSearchParams';
import type { GenericPagination } from '~/types';
import { useQuery } from '@tanstack/vue-query';
import { MeterReadingServiceImpl } from '~/services/impl/MeterReadingServiceImpl';

export const useQueryMeterReadingList = (
    params: MeterReadingPaginationSearchParams,
    searchCount: MaybeRef<number>,
    options?: UseQueryOptions<GenericPagination<MeterReadingListResponse[]>>,
) => {
    const MeterReadingService = new MeterReadingServiceImpl();
    const query = useQuery<GenericPagination<MeterReadingListResponse[]>>({
        queryKey: ['general-config-list', params, searchCount],
        queryFn: () => MeterReadingService.getMeterReadingList(params),
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
