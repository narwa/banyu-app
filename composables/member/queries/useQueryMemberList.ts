import type { UseQueryOptions } from '@tanstack/vue-query';
import type { MemberListResponse } from '~/models/Member';
import type { MemberPaginationSearchParams } from '~/models/params/MemberPaginationSearchParams';
import type { GenericPagination } from '~/types';
import { useQuery } from '@tanstack/vue-query';
import { MemberServiceImpl } from '~/services/impl/MemberServiceImpl';

export const useQueryMemberList = (
    params: MemberPaginationSearchParams,
    searchCount: MaybeRef<number>,
    options?: UseQueryOptions<GenericPagination<MemberListResponse[]>>,
) => {
    const userService = new MemberServiceImpl();
    const query = useQuery<GenericPagination<MemberListResponse[]>>({
        queryKey: ['member-list', params, searchCount],
        queryFn: () => userService.getMemberList(params),
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
