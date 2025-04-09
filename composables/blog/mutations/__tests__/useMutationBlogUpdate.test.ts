import type { VueWrapper } from '@vue/test-utils';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, ref } from 'vue';
import { BlogDto } from '~/models/dtos/BlogDto';
import { BlogServiceImpl } from '~/services/impl/BlogServiceImpl';
import { useMutationBlogUpdate } from '../useMutationBlogUpdate';

const spyOnUpdateBlog = vi.spyOn(BlogServiceImpl.prototype, 'updateBlog').mockReturnValue(Promise.resolve({
    id: '1',
    blogKey: 'test-1-updated',
}));

describe('useMutationBlogUpdate', () => {
    const blogId = ref('1');
    const useMutationBlogUpdateComponent = defineComponent({
        setup() {
            return { ...useMutationBlogUpdate(blogId) };
        },
        template: '<div></div>',
    });

    let useMutationBlogUpdateWrapper: VueWrapper<InstanceType<typeof useMutationBlogUpdateComponent>>;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        useMutationBlogUpdateWrapper = shallowMount(useMutationBlogUpdateComponent);
    });

    afterEach(() => {
        useMutationBlogUpdateWrapper.unmount();
    });

    it('should expose the correct properties', () => {
        expect(useMutationBlogUpdateWrapper.vm).toHaveProperty('mutateAsync');
        expect(useMutationBlogUpdateWrapper.vm.error).toBeDefined();
    });

    it('should handle update blog correctly', async () => {
        const payload = new BlogDto()
            .setSlug('test-1-updated')
            .setTitle('Test 1 Updated')
            .setThumbnail('test-1-updated')
            .setBody('Test 1 Updated')
            .setAuthorId('1')
            .setTags(['test', 'updated']);

        expect(spyOnUpdateBlog).toHaveBeenCalledTimes(0);

        useMutationBlogUpdateWrapper.vm.mutateAsync(payload);

        expect(useMutationBlogUpdateWrapper.vm.isPending).toBe(true);

        await flushPromises();

        expect(spyOnUpdateBlog).toHaveBeenCalledTimes(1);
        expect(spyOnUpdateBlog).toHaveBeenCalledWith('1', payload);
        expect(useMutationBlogUpdateWrapper.vm.isPending).toBe(false);
    });

    it('should handle error when update blog fails', async () => {
        const error = new Error('Failed to update blog');
        spyOnUpdateBlog.mockRejectedValueOnce(error);

        const payload = new BlogDto()
            .setSlug('test-2-updated')
            .setTitle('Test 2 Updated')
            .setThumbnail('test-2-updated')
            .setBody('Test 2 Updated')
            .setAuthorId('2')
            .setTags(['test', 'updated']);

        await expect(useMutationBlogUpdateWrapper.vm.mutateAsync(payload))
            .rejects
            .toThrow('Failed to update blog');
        expect(useMutationBlogUpdateWrapper.vm.error).toBeTruthy();
        expect(spyOnUpdateBlog).toHaveBeenCalledWith('1', payload);
    });

    it('should reset error state after successful mutation', async () => {
        spyOnUpdateBlog.mockRejectedValueOnce(new Error('Failed to update blog'));
        const errorPayload = new BlogDto()
            .setSlug('error-test-updated')
            .setTitle('Error Test Updated')
            .setThumbnail('error-test-updated')
            .setBody('Error Test Updated')
            .setAuthorId('3')
            .setTags(['test', 'error']);

        await expect(useMutationBlogUpdateWrapper.vm.mutateAsync(errorPayload))
            .rejects
            .toThrow();
        expect(useMutationBlogUpdateWrapper.vm.error).toBeTruthy();

        spyOnUpdateBlog.mockResolvedValueOnce({ id: '1', blogKey: 'success-test-updated' });
        const successPayload = new BlogDto()
            .setSlug('success-test-updated')
            .setTitle('Success Test Updated')
            .setThumbnail('success-test-updated')
            .setBody('Success Test Updated')
            .setAuthorId('4')
            .setTags(['test', 'success']);

        await useMutationBlogUpdateWrapper.vm.mutateAsync(successPayload);
        expect(useMutationBlogUpdateWrapper.vm.error).toBeNull();
    });

    it('should handle multiple successive updates correctly', async () => {
        spyOnUpdateBlog.mockResolvedValueOnce({ id: '1', blogKey: 'test-5-updated' });
        spyOnUpdateBlog.mockResolvedValueOnce({ id: '1', blogKey: 'test-6-updated' });

        const payload1 = new BlogDto()
            .setSlug('test-5-updated')
            .setTitle('Test 5 Updated')
            .setThumbnail('test-5-updated')
            .setBody('Test 5 Updated')
            .setAuthorId('5')
            .setTags(['test', 'multiple']);

        const payload2 = new BlogDto()
            .setSlug('test-6-updated')
            .setTitle('Test 6 Updated')
            .setThumbnail('test-6-updated')
            .setBody('Test 6 Updated')
            .setAuthorId('6')
            .setTags(['test', 'multiple']);

        await useMutationBlogUpdateWrapper.vm.mutateAsync(payload1);
        await useMutationBlogUpdateWrapper.vm.mutateAsync(payload2);

        expect(spyOnUpdateBlog).toHaveBeenCalledTimes(2);
        expect(spyOnUpdateBlog).toHaveBeenNthCalledWith(1, '1', payload1);
        expect(spyOnUpdateBlog).toHaveBeenNthCalledWith(2, '1', payload2);
    });
});
