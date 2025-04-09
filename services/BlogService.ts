import type { BlogDetail, BlogList, BlogResponse } from '~/models/Blog';
import type { BlogDto } from '~/models/dtos/BlogDto';
import type { BlogPaginationSearchParams } from '~/models/params/BlogPaginationSearchParams';
import type { GenericPagination } from '~/types';

export type BlogService = {
    getBlogList: (params: BlogPaginationSearchParams) => Promise<GenericPagination<BlogList[]>>;
    getBlogDetail: (slug: string) => Promise<BlogDetail>;
    statusBlog: (id: string, status: string) => Promise<void>;
    createBlog: (data: BlogDto) => Promise<BlogResponse>;
    updateBlog: (id: string, data: BlogDto) => Promise<BlogResponse>;
};
