import type { VueWrapper } from '@vue/test-utils';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BlogDto } from '~/models/dtos/BlogDto';
import { BlogServiceImpl } from '~/services/impl/BlogServiceImpl';
import { useMutationBlogCreate } from '../useMutationBlogCreate';

const spyOnCreateBlog = vi.spyOn(BlogServiceImpl.prototype, 'createBlog').mockReturnValue(Promise.resolve({
    id: '1',
    blogKey: 'test-1',
}));

describe('useMutationBlogCreate', () => {
    const useMutationBlogCreateComponent = defineComponent({
        setup() {
            return { ...useMutationBlogCreate() };
        },
        template: '<div></div>',
    });

    let useMutationBlogCreateWrapper: VueWrapper<InstanceType<typeof useMutationBlogCreateComponent>>;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        useMutationBlogCreateWrapper = shallowMount(useMutationBlogCreateComponent);
    });

    afterEach(() => {
        useMutationBlogCreateWrapper.unmount();
    });

    it('should expose the correct properties', () => {
        expect(useMutationBlogCreateWrapper.vm).toHaveProperty('mutateAsync');
        expect(useMutationBlogCreateWrapper.vm.error).toBeDefined();
    });

    it('should handle create blog correctly', async () => {
        const payload = new BlogDto().setSlug('test-1').setTitle('Test 1').setThumbnail('test-1').setBody('Test 1').setAuthorId('1').setTags(['test']);

        expect(spyOnCreateBlog).toHaveBeenCalledTimes(0);

        useMutationBlogCreateWrapper.vm.mutateAsync(payload);

        expect(useMutationBlogCreateWrapper.vm.isPending).toBe(true);

        await flushPromises();

        expect(spyOnCreateBlog).toHaveBeenCalledTimes(1);
        expect(spyOnCreateBlog).toHaveBeenCalledWith(payload);
        expect(useMutationBlogCreateWrapper.vm.isPending).toBe(false);
    });

    it('should handle error when create blog fails', async () => {
        const error = new Error('Failed to create blog');
        spyOnCreateBlog.mockRejectedValueOnce(error);

        const payload = new BlogDto().setSlug('test-2').setTitle('Test 2').setThumbnail('test-2').setBody('Test 2').setAuthorId('2').setTags(['test']);

        await expect(useMutationBlogCreateWrapper.vm.mutateAsync(payload)).rejects.toThrow('Failed to create blog');
        expect(useMutationBlogCreateWrapper.vm.error).toBeTruthy();
        expect(spyOnCreateBlog).toHaveBeenCalledWith(payload);
    });

    it('should reset error state after successful mutation', async () => {
        spyOnCreateBlog.mockRejectedValueOnce(new Error('Failed to create blog'));
        const errorPayload = new BlogDto().setSlug('error-test').setTitle('Error Test').setThumbnail('error-test').setBody('Error Test').setAuthorId('3').setTags(['test']);

        await expect(useMutationBlogCreateWrapper.vm.mutateAsync(errorPayload)).rejects.toThrow();
        expect(useMutationBlogCreateWrapper.vm.error).toBeTruthy();

        spyOnCreateBlog.mockResolvedValueOnce({ id: '3', blogKey: 'success-test' });
        const successPayload = new BlogDto().setSlug('success-test').setTitle('Success Test').setThumbnail('success-test').setBody('Success Test').setAuthorId('4').setTags(['test']);

        await useMutationBlogCreateWrapper.vm.mutateAsync(successPayload);
        expect(useMutationBlogCreateWrapper.vm.error).toBeNull();
    });

    it('should handle multiple successive mutations correctly', async () => {
        spyOnCreateBlog.mockResolvedValueOnce({ id: '4', blogKey: 'test-4' });
        spyOnCreateBlog.mockResolvedValueOnce({ id: '5', blogKey: 'test-5' });

        const payload1 = new BlogDto().setSlug('test-4').setTitle('Test 4').setThumbnail('test-4').setBody('Test 4').setAuthorId('5').setTags(['test']);
        const payload2 = new BlogDto().setSlug('test-5').setTitle('Test 5').setThumbnail('test-5').setBody('Test 5').setAuthorId('6').setTags(['test']);

        await useMutationBlogCreateWrapper.vm.mutateAsync(payload1);
        await useMutationBlogCreateWrapper.vm.mutateAsync(payload2);

        expect(spyOnCreateBlog).toHaveBeenCalledTimes(2);
        expect(spyOnCreateBlog).toHaveBeenNthCalledWith(1, payload1);
        expect(spyOnCreateBlog).toHaveBeenNthCalledWith(2, payload2);
    });
});
