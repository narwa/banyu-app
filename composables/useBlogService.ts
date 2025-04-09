import { useAsyncData } from '#app';
import { BlogServiceImpl } from '~/services/impl/BlogServiceImpl';

export const useBlogService = () => {
    const blogService = new BlogServiceImpl();

    const statusBlog = (id: string, status: string) => {
        return useAsyncData('status-blog', async () => {
            return blogService.statusBlog(id, status);
        });
    };

    return {
        statusBlog,
    };
};
