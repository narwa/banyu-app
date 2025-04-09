import type { BlogDetail, BlogList, BlogResponse } from '~/models/Blog';
import type { BlogDto } from '~/models/dtos/BlogDto';
import type { BlogPaginationSearchParams } from '~/models/params/BlogPaginationSearchParams';
import type { BlogService } from '~/services/BlogService';
import type { GenericPagination } from '~/types';
import { useNuxtApp } from '#app';
import { BlogEndpoint } from '~/endpoints/BlogEndpoint';

export class BlogServiceImpl implements BlogService {
    async getBlogList(params: BlogPaginationSearchParams): Promise<GenericPagination<BlogList[]>> {
        return await useNuxtApp().$api<GenericPagination<BlogList[]>>(BlogEndpoint.BLOG_LIST, {
            query: {
                ...params,
                page: params.page - 1,
            },
        });
    }

    async getBlogDetail(key: string): Promise<BlogDetail> {
        return await useNuxtApp().$api<BlogDetail>(BlogEndpoint.BLOG_DETAIL.replace('[key]', key));
    }

    async statusBlog(id: string, status: string): Promise<void> {
        return await useNuxtApp().$api<void>(BlogEndpoint.BLOG_STATUS.replace('[id]', id), {
            method: 'PUT',
            params: { status },
        });
    }

    createBlog(data: BlogDto): Promise<BlogResponse> {
        return useNuxtApp().$api<BlogResponse>(
            BlogEndpoint.BLOG_CREATE,
            {
                method: 'POST',
                body: {
                    ...data,
                },
            },
        );
    }

    updateBlog(id: string, data: BlogDto): Promise<BlogResponse> {
        return useNuxtApp().$api<BlogResponse>(
            BlogEndpoint.BLOG_UPDATE.replace('[id]', id),
            {
                method: 'PUT',
                body: {
                    ...data,
                },
            },
        );
    }
}
