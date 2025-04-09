import type { BlogDetail, BlogList, BlogResponse } from '~/models/Blog';
import type { GenericPagination } from '~/types';
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BlogEndpoint } from '~/endpoints/BlogEndpoint';
import { BlogDto } from '~/models/dtos/BlogDto';
import { BlogPaginationSearchParams } from '~/models/params/BlogPaginationSearchParams';
import { BlogServiceImpl } from '~/services/impl/BlogServiceImpl';

const mockApi = vi.fn();
vi.mock('#app', () => ({
    useNuxtApp: () => ({
        $api: mockApi,
    }),
}));

describe('blogServiceImpl', () => {
    const service = new BlogServiceImpl();
    const params = new BlogPaginationSearchParams();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        vi.restoreAllMocks();
    });

    describe('getBlogList', () => {
        it('should use default constructor values', async () => {
            const expectedResponse: GenericPagination<BlogList[]> = {
                data: [],
                elements: 0,
                pages: 0,
            };
            mockApi.mockResolvedValueOnce(expectedResponse);

            const result = await service.getBlogList(params);

            expect(result).toEqual(expectedResponse);
        });

        it('should handle pagination parameters', async () => {
            params.setPage(2);
            params.setSize(20);
            params.setSortBy('title');
            params.setDirection('desc');

            mockApi.mockResolvedValueOnce({});

            await service.getBlogList(params);

            expect(mockApi).toHaveBeenCalledWith(BlogEndpoint.BLOG_LIST, {
                query: expect.objectContaining({
                    page: 1,
                    size: 20,
                    sortBy: 'title',
                    direction: 'desc',
                }),
            });
        });

        it('should handle API error response', async () => {
            mockApi.mockRejectedValueOnce(new Error('Network error'));

            await expect(service.getBlogList(params)).rejects.toThrow('Network error');
        });
    });

    describe('getBlogDetail', () => {
        it('should fetch blog detail by key', async () => {
            const blogKey = 'test-blog';
            const expectedResponse: BlogDetail = {
                id: '1',
                blogKey: 'test-blog',
                title: 'Test Blog',
                slug: 'Test Content',
                thumbnail: '',
                body: '',
                authorId: '',
                authorName: '',
                authorThumbnail: '',
                contentId: '',
                status: '',
                readingTimeMin: 0,
                createDate: 0,
                modifiedDate: 0,
                publishDate: 0,
                archiveDate: 0,
                tags: [],
                seo: {
                    metaTitle: '',
                    metaDescription: '',
                    metaKeyword: '',
                    ogTitle: '',
                    ogDescription: '',
                    ogImage: '',
                },
            };
            mockApi.mockResolvedValueOnce(expectedResponse);

            const result = await service.getBlogDetail(blogKey);

            expect(result).toEqual(expectedResponse);
            expect(mockApi).toHaveBeenCalledWith(BlogEndpoint.BLOG_DETAIL.replace('[key]', blogKey));
        });

        it('should handle non-existent blog key', async () => {
            const nonExistentKey = 'non-existent-blog';
            mockApi.mockResolvedValueOnce(null);

            const result = await service.getBlogDetail(nonExistentKey);

            expect(result).toBeNull();
        });
    });

    describe('statusBlog', () => {
        it('should update blog status', async () => {
            const blogId = '1';
            const status = 'PUBLISHED';
            mockApi.mockResolvedValueOnce(undefined);

            await service.statusBlog(blogId, status);

            expect(mockApi).toHaveBeenCalledWith(
                BlogEndpoint.BLOG_STATUS.replace('[id]', blogId),
                {
                    method: 'PUT',
                    params: { status },
                },
            );
        });

        it('should handle invalid status update', async () => {
            const blogId = '1';
            const invalidStatus = 'INVALID_STATUS';
            mockApi.mockRejectedValueOnce(new Error('Invalid status'));

            await expect(service.statusBlog(blogId, invalidStatus)).rejects.toThrow('Invalid status');
        });
    });

    describe('createBlog', () => {
        it('should create a new blog', async () => {
            const blogData: BlogDto = new BlogDto()
                .setTitle('New Blog')
                .setSlug('new-blog')
                .setThumbnail('')
                .setBody('New Content')
                .setAuthorId('1')
                .setTags(['new', 'blog'])
                .setPublishDate(new Date());
            const expectedResponse: BlogResponse = {
                id: '1',
                blogKey: 'new-blog',
            };
            mockApi.mockResolvedValueOnce(expectedResponse);

            const result = await service.createBlog(blogData);

            expect(result).toEqual(expectedResponse);
            expect(mockApi).toHaveBeenCalledWith(
                BlogEndpoint.BLOG_CREATE,
                {
                    method: 'POST',
                    body: blogData,
                },
            );
        });

        it('should handle duplicate blog creation', async () => {
            const duplicateBlogData = new BlogDto()
                .setTitle('Existing Blog')
                .setSlug('existing-blog')
                .setBody('Content')
                .setAuthorId('1');

            mockApi.mockRejectedValueOnce(new Error('Blog with this slug already exists'));

            await expect(service.createBlog(duplicateBlogData)).rejects.toThrow('Blog with this slug already exists');
        });
    });

    describe('updateBlog', () => {
        it('should update an existing blog', async () => {
            const blogId = '1';
            const blogData: BlogDto = new BlogDto()
                .setTitle('New Blog')
                .setSlug('new-blog')
                .setThumbnail('')
                .setBody('New Content')
                .setAuthorId('1')
                .setTags(['new', 'blog'])
                .setPublishDate(new Date());
            const expectedResponse: BlogResponse = {
                id: '1',
                blogKey: 'new-blog',
            };
            mockApi.mockResolvedValueOnce(expectedResponse);

            const result = await service.updateBlog(blogId, blogData);

            expect(result).toEqual(expectedResponse);
            expect(mockApi).toHaveBeenCalledWith(
                BlogEndpoint.BLOG_UPDATE.replace('[id]', blogId),
                {
                    method: 'PUT',
                    body: blogData,
                },
            );
        });

        it('should handle non-existent blog update', async () => {
            const nonExistentId = '999';
            const blogData = new BlogDto()
                .setTitle('Updated Blog')
                .setSlug('updated-blog');

            mockApi.mockRejectedValueOnce(new Error('Blog not found'));

            await expect(service.updateBlog(nonExistentId, blogData)).rejects.toThrow('Blog not found');
        });
    });
});
