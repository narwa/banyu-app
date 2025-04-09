import type { UseMutationOptions } from '@tanstack/vue-query';
import type { BlogDetail } from '~/models/Blog';
import type { ErrorResponse } from '~/types';
import { BlogServiceImpl } from '~/services/impl/BlogServiceImpl';

export const useMutationGetBlogDetail = (
    options?: UseMutationOptions<
        BlogDetail,
        ErrorResponse,
        {
            blogKey: string;
        },
        unknown
    >,
) => {
    const blogService = new BlogServiceImpl();
    return useMutation({
        mutationFn: ({ blogKey }) => blogService.getBlogDetail(blogKey),
        ...options,
    });
};
