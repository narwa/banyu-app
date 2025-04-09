import type { VueWrapper } from '@vue/test-utils';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, reactive, ref } from 'vue';
import { BlogPaginationSearchParams } from '~/models/params/BlogPaginationSearchParams';
import { BlogServiceImpl } from '~/services/impl/BlogServiceImpl';
import { useQueryBlogList } from '../useQueryBlogList';

const spyOnGetBlogList = vi.spyOn(BlogServiceImpl.prototype, 'getBlogList').mockReturnValue(Promise.resolve({
    data: [
        {
            id: '1',
            blogKey: 'test-blog-1',
            title: 'Test Blog 1',
            slug: 'test-blog-1',
            thumbnail: 'thumbnail-1',
            status: 'PUBLISHED',
            publishDate: Date.now(),
            authorId: '1',
            authorName: 'Author 1',
            authorThumbnail: '',
            modifiedDate: Date.now(),
        },
    ],
    elements: 1,
    pages: 1,
}) as any);

describe('useQueryBlogList', () => {
    const useQueryBlogListComponent = defineComponent({
        setup() {
            const params = reactive(new BlogPaginationSearchParams());
            const searchCount = ref(0);

            const { data, total, results, ...query } = useQueryBlogList(params, searchCount);

            return { data, params, searchCount, total, results, ...query };
        },
        template: '<div></div>',
    });

    let useQueryBlogListWrapper: VueWrapper<InstanceType<typeof useQueryBlogListComponent>>;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        useQueryBlogListWrapper = shallowMount(useQueryBlogListComponent);
    });

    afterEach(() => {
        useQueryBlogListWrapper.unmount();
    });

    it('should expose the correct properties', () => {
        expect(useQueryBlogListWrapper.vm).toHaveProperty('data');
        expect(useQueryBlogListWrapper.vm).toHaveProperty('params');
        expect(useQueryBlogListWrapper.vm).toHaveProperty('searchCount');
        expect(useQueryBlogListWrapper.vm).toHaveProperty('total');
        expect(useQueryBlogListWrapper.vm).toHaveProperty('results');
        expect(useQueryBlogListWrapper.vm).toHaveProperty('isLoading');
        expect(useQueryBlogListWrapper.vm).toHaveProperty('error');
    });

    it('should fetch blog list correctly', async () => {
        expect(spyOnGetBlogList).toHaveBeenCalledTimes(1);

        await flushPromises();

        expect(useQueryBlogListWrapper.vm.isLoading).toBe(false);
        expect(useQueryBlogListWrapper.vm.error).toBeNull();
        expect(useQueryBlogListWrapper.vm.data).toBeDefined();
        expect(useQueryBlogListWrapper.vm.total).toBe(1);
        expect(useQueryBlogListWrapper.vm.results).toHaveLength(1);
        expect(useQueryBlogListWrapper.vm.results[0]).toEqual(expect.objectContaining({
            id: '1',
            blogKey: 'test-blog-1',
            title: 'Test Blog 1',
        }));
    });

    it('should handle error when fetching blog list fails', async () => {
        const error = new Error('Failed to fetch blog list');
        spyOnGetBlogList.mockRejectedValueOnce(error);

        useQueryBlogListWrapper = shallowMount(useQueryBlogListComponent);

        await flushPromises();

        expect(useQueryBlogListWrapper.vm.error).toBeTruthy();
        expect(useQueryBlogListWrapper.vm.isLoading).toBe(false);
    });

    it('should refetch when search count changes', async () => {
        await flushPromises();
        expect(spyOnGetBlogList).toHaveBeenCalledTimes(1);

        useQueryBlogListWrapper.vm.searchCount++;
        await flushPromises();

        expect(spyOnGetBlogList).toHaveBeenCalledTimes(2);
    });

    it('should refetch when params change', async () => {
        await flushPromises();
        expect(spyOnGetBlogList).toHaveBeenCalledTimes(1);

        useQueryBlogListWrapper.vm.params.page = 2;
        await flushPromises();

        expect(spyOnGetBlogList).toHaveBeenCalledTimes(2);
        expect(spyOnGetBlogList).toHaveBeenLastCalledWith(
            expect.objectContaining({ page: 2, status: ['PUBLISHED', 'DRAFT', 'ARCHIVED'] }),
        );
    });
});
