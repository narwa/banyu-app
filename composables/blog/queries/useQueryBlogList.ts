import type { UseQueryOptions } from '@tanstack/vue-query';
import type { BlogList } from '~/models/Blog';
import type { BlogPaginationSearchParams } from '~/models/params/BlogPaginationSearchParams';
import type { GenericPagination } from '~/types';
import { useQuery } from '@tanstack/vue-query';
import { BlogServiceImpl } from '~/services/impl/BlogServiceImpl';

export const useQueryBlogList = (
    params: BlogPaginationSearchParams,
    searchCount: MaybeRef<number>,
    options?: UseQueryOptions<GenericPagination<BlogList[]>>,
) => {
    const blogService = new BlogServiceImpl();
    const query = useQuery<GenericPagination<BlogList[]>>({
        queryKey: ['blog-list', params, searchCount],
        queryFn: () => blogService.getBlogList(params.setStatus(['PUBLISHED', 'DRAFT', 'ARCHIVED'])),
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
