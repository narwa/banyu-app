import type { UseMutationOptions } from '@tanstack/vue-query';
import type { BlogResponse } from '~/models/Blog';
import type { BlogDto } from '~/models/dtos/BlogDto';
import type { ErrorResponse } from '~/types';
import { BlogServiceImpl } from '~/services/impl/BlogServiceImpl';

export const useMutationBlogUpdate = (
    id: MaybeRef<string>,
    options?: UseMutationOptions<
        BlogResponse,
        ErrorResponse,
        BlogDto,
        unknown
    >,
) => {
    const blogService = new BlogServiceImpl();
    return useMutation({
        mutationFn: (data: BlogDto) => blogService.updateBlog(toValue(id), data),
        ...options,
    });
};
