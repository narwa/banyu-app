import type { UseFetchOptions } from '#app';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useAPI } from '../useAPI';

const mockUseFetch = vi.fn();
const mockUseNuxtApp = vi.fn(() => ({
    $api: vi.fn(),
}));

vi.mock('#app', () => ({
    useFetch: (...args: any[]) => mockUseFetch(...args),
    useNuxtApp: () => ({
        $api: mockUseNuxtApp().$api,
    }),
}));

describe('useAPI', () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should call useFetch with correct parameters', () => {
        const url = '/api/test';
        const options: UseFetchOptions<unknown> = {
            method: 'GET' as const,
            params: { id: 1 },
        };

        useAPI(url, options);

        expect(mockUseFetch).toHaveBeenCalled();
        expect(mockUseFetch.mock.calls[0][0]).toBe(url);
        expect(mockUseFetch.mock.calls[0][1]).toMatchObject({
            ...options,
            $fetch: expect.any(Function),
        });
    });

    it('should use $api from nuxt app', () => {
        const url = '/api/test';
        const mockApi = vi.fn();
        mockUseNuxtApp.mockReturnValueOnce({ $api: mockApi });

        useAPI(url);

        expect(mockUseFetch).toHaveBeenCalled();
        expect(mockUseFetch.mock.calls[0][0]).toBe(url);
        expect(mockUseFetch.mock.calls[0][1]).toMatchObject({
            $fetch: expect.any(Function),
        });
    });

    it('should handle options being undefined', () => {
        const url = '/api/test';

        useAPI(url);

        expect(mockUseFetch).toHaveBeenCalled();
        expect(mockUseFetch.mock.calls[0][0]).toBe(url);
        expect(mockUseFetch.mock.calls[0][1]).toMatchObject({
            $fetch: expect.any(Function),
        });
    });

    it('should preserve all options while adding $fetch', () => {
        const url = '/api/test';
        const options: UseFetchOptions<unknown> = {
            method: 'POST' as const,
            body: { data: 'test' },
            headers: { 'Content-Type': 'application/json' },
            params: { id: 1 },
        };

        useAPI(url, options);

        expect(mockUseFetch).toHaveBeenCalled();
        expect(mockUseFetch.mock.calls[0][0]).toBe(url);
        expect(mockUseFetch.mock.calls[0][1]).toMatchObject({
            ...options,
            $fetch: expect.any(Function),
        });
    });
});
