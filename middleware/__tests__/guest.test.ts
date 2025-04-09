import { navigateTo } from '#app';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import guest from '../guest';

const mockToken = {
    value: null as string | null,
};

vi.mock('~/stores/useAuthStore', () => ({
    useAuthStore: vi.fn(() => ({
        token: mockToken,
    })),
}));

vi.mock('#app', () => ({
    defineNuxtRouteMiddleware: (fn: any) => fn,
    navigateTo: vi.fn(),
}));

describe('guest Middleware', () => {
    const mockTo = {
        name: 'login',
        path: '/login',
        params: {},
        query: {},
        hash: '',
        matched: [],
        fullPath: '/login',
        meta: {},
        redirectedFrom: undefined,
    };
    const mockFrom = {
        name: 'dashboard',
        path: '/',
        params: {},
        query: {},
        hash: '',
        matched: [],
        fullPath: '/',
        meta: {},
        redirectedFrom: undefined,
    };
    const mockNavigateTo = vi.mocked(navigateTo);

    beforeEach(() => {
        mockToken.value = null;
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should allow navigation when no token exists', () => {
        mockToken.value = null;

        const result = guest(mockTo, mockFrom);

        expect(result).toBeUndefined();
    });

    it('should redirect to index when token exists', () => {
        mockToken.value = 'mock-token';

        guest(mockTo, mockFrom);

        expect(mockNavigateTo).toHaveBeenCalledWith({ name: 'index' });
    });
});
