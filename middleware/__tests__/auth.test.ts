import { navigateTo } from '#app';
import dayjs from '#build/dayjs.imports.mjs';
import { useJwt } from '@vueuse/integrations/useJwt';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import authMiddleware from '../auth';

vi.mock('#build/dayjs.imports.mjs', () => {
    return {
        default: vi.fn(),
    };
});

vi.mock('@vueuse/integrations/useJwt', () => ({
    useJwt: vi.fn(),
}));

const mockSetToken = vi.fn();
const mockTokenValue = 'mock-token';

const mockToken = {
    value: mockTokenValue,
};

vi.mock('~/stores/useAuthStore', () => ({
    useAuthStore: vi.fn(() => ({
        token: mockToken,
        setToken: mockSetToken,
    })),
}));

vi.mock('#app', () => ({
    defineNuxtRouteMiddleware: (fn: any) => fn,
    navigateTo: vi.fn(),
    useRouter: vi.fn(),
}));

describe('auth Middleware', () => {
    const mockTo = {
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
    const mockFrom = {
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

    const mockPayload = {
        value: {
            exp: 0 as number | undefined,
        },
    };

    let mockUnixTime: number;

    beforeEach(() => {
        mockUnixTime = 1000;
        vi.mocked(useJwt).mockReturnValue({ payload: mockPayload } as any);

        mockToken.value = 'mock-token';
        mockSetToken.mockClear();

        vi.mocked(dayjs).mockImplementation(() => ({
            unix: () => mockUnixTime,
        } as any));
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should allow navigation when token exists and session is active', () => {
        mockUnixTime = 1000;
        const expirationTime = 2000;
        mockPayload.value.exp = expirationTime;

        const result = authMiddleware(mockTo, mockFrom);

        expect(result).toBeUndefined();
        expect(navigateTo).not.toHaveBeenCalled();
        expect(mockSetToken).not.toHaveBeenCalled();
    });

    it('should redirect to login when session is expired', () => {
        mockUnixTime = 2000;
        const expirationTime = 1000;
        mockPayload.value.exp = expirationTime;

        authMiddleware(mockTo, mockFrom);

        expect(navigateTo).toHaveBeenCalledWith({ name: 'login' });
        expect(mockSetToken).toHaveBeenCalledWith('');
    });

    it('should redirect to login when exp is undefined', () => {
        mockPayload.value.exp = undefined;

        authMiddleware(mockTo, mockFrom);

        expect(navigateTo).toHaveBeenCalledWith({ name: 'login' });
        expect(mockSetToken).toHaveBeenCalledWith('');
    });
});
