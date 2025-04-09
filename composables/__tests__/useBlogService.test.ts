import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ref } from 'vue';
import { BlogServiceImpl } from '~/services/impl/BlogServiceImpl';
import { useBlogService } from '../useBlogService';

const mockUseAsyncData = vi.fn();
vi.mock('#app', () => ({
    useAsyncData: (...args: any[]) => mockUseAsyncData(...args),
}));

describe('useBlogService', () => {
    const spyOnStatusBlog = vi.spyOn(BlogServiceImpl.prototype, 'statusBlog')
        .mockResolvedValue(undefined);

    beforeEach(() => {
        mockUseAsyncData.mockImplementation((key: string, fn: () => Promise<any>) => {
            fn();
            return {
                data: ref(null),
                pending: ref(false),
                refresh: vi.fn(),
                execute: async () => {
                    const result = await fn();
                    return { data: ref(result) };
                },
            };
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    describe('statusBlog', () => {
        it('should update blog status with correct id and status', async () => {
            const id = '1';
            const status = 'PUBLISHED';

            const { statusBlog } = useBlogService();
            await statusBlog(id, status);

            expect(mockUseAsyncData).toHaveBeenCalledWith(
                'status-blog',
                expect.any(Function),
            );
            expect(spyOnStatusBlog).toHaveBeenCalledWith(id, status);
        });
    });
});
