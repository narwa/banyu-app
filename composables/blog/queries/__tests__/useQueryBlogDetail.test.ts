import type { VueWrapper } from '@vue/test-utils';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent } from 'vue';
import { BlogServiceImpl } from '~/services/impl/BlogServiceImpl';
import { useMutationGetBlogDetail } from '../useQueryBlogDetail';

const mockBlogDetail = {
    id: '1',
    blogKey: 'test-blog-1',
    title: 'Test Blog 1',
    slug: 'test-blog-1',
    thumbnail: 'thumbnail-1',
    body: '<p>Test blog content</p>',
    authorId: '1',
    authorName: 'Author 1',
    authorThumbnail: 'author-thumbnail-1',
    contentId: 'content-1',
    status: 'PUBLISHED',
    readingTimeMin: 5,
    createDate: Date.now(),
    modifiedDate: Date.now(),
    publishDate: Date.now(),
    archiveDate: 0,
    tags: ['test', 'blog'],
    seo: {
        metaTitle: 'Test Blog 1',
        metaDescription: 'Test blog description',
        metaKeyword: 'test, blog',
        ogTitle: 'Test Blog 1',
        ogDescription: 'Test blog description',
        ogImage: 'og-image-1',
    },
};

const spyOnGetBlogDetail = vi.spyOn(BlogServiceImpl.prototype, 'getBlogDetail').mockResolvedValue(mockBlogDetail);

describe('useMutationGetBlogDetail', () => {
    const useMutationGetBlogDetailComponent = defineComponent({
        setup() {
            return { ...useMutationGetBlogDetail() };
        },
        template: '<div></div>',
    });

    let useMutationGetBlogDetailwrapper: VueWrapper<InstanceType<typeof useMutationGetBlogDetailComponent>>;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        useMutationGetBlogDetailwrapper = shallowMount(useMutationGetBlogDetailComponent);
    });

    afterEach(() => {
        useMutationGetBlogDetailwrapper.unmount();
    });

    it('should expose the correct properties', () => {
        expect(useMutationGetBlogDetailwrapper.vm).toHaveProperty('mutate');
        expect(useMutationGetBlogDetailwrapper.vm).toBeDefined();
    });

    it('should fetch blog detail correctly', async () => {
        const blogKey = 'test-blog-1';

        expect(spyOnGetBlogDetail).toHaveBeenCalledTimes(0);

        useMutationGetBlogDetailwrapper.vm.mutateAsync({ blogKey });

        expect(useMutationGetBlogDetailwrapper.vm.isPending).toBe(true);

        await flushPromises();

        expect(spyOnGetBlogDetail).toHaveBeenCalledTimes(1);
        expect(spyOnGetBlogDetail).toHaveBeenCalledWith(blogKey);
        expect(useMutationGetBlogDetailwrapper.vm.isPending).toBe(false);
    });

    it('should handle error when fetching blog detail fails', async () => {
        const error = new Error('Failed to fetch blog detail');
        spyOnGetBlogDetail.mockRejectedValueOnce(error);

        const blogKey = 'non-existent';

        await expect(useMutationGetBlogDetailwrapper.vm.mutateAsync({ blogKey })).rejects.toThrowError(error);

        expect(spyOnGetBlogDetail).toHaveBeenCalledWith(blogKey);
    });

    it('should reset mutation state when reset is called', async () => {
        spyOnGetBlogDetail.mockRejectedValueOnce(new Error('Failed to fetch blog detail'));
        const errorBlogKey = 'error-blog-1';

        await expect(useMutationGetBlogDetailwrapper.vm.mutateAsync({ blogKey: errorBlogKey })).rejects.toThrowError(
            'Failed to fetch blog detail',
        );

        useMutationGetBlogDetailwrapper.vm.reset();
    });
});
