import { navigateTo } from '#app';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { toast } from 'vue-sonner';
import admin from '../admin';

const mockAuthStore = {
    token: 'mock-token',
    user: { userType: 'ADMIN' } as { userType: string } | null,
    logout: vi.fn(),
    setUser: vi.fn(),
};

vi.mock('~/stores/useAuthStore', () => ({
    useAuthStore: vi.fn(() => mockAuthStore),
}));

const mockGetDetailProfile = vi.fn();
vi.mock('~/composables/user/useMutationGetDetailProfile', () => ({
    useMutationGetDetailProfile: vi.fn(() => ({
        mutateAsync: mockGetDetailProfile,
    })),
}));

vi.mock('#app', () => ({
    defineNuxtRouteMiddleware: (fn: any) => fn,
    navigateTo: vi.fn(),
}));

vi.mock('vue-sonner', () => ({
    toast: {
        error: vi.fn(),
    },
}));

describe('admin Middleware', () => {
    const mockRoute = {
        name: 'admin',
        path: '/admin',
        params: {},
        query: {},
        hash: '',
        matched: [],
        fullPath: '/admin',
        meta: {},
        redirectedFrom: undefined,
    };

    const mockFromRoute = {
        name: 'home',
        path: '/',
        params: {},
        query: {},
        hash: '',
        matched: [],
        fullPath: '/',
        meta: {},
        redirectedFrom: undefined,
    };

    beforeEach(() => {
        vi.resetAllMocks();

        mockAuthStore.token = 'mock-token';
        mockAuthStore.user = { userType: 'ADMIN' };
    });

    it('should allow navigation if user is admin', async () => {
        await admin(mockRoute, mockFromRoute);

        expect(navigateTo).not.toHaveBeenCalled();
    });

    it('should redirect to index if user is not admin', async () => {
        mockAuthStore.user = { userType: 'USER' };

        await admin(mockRoute, mockFromRoute);

        expect(navigateTo).toHaveBeenCalledWith({ name: 'index' });
    });

    it('should redirect to login if profile fetch fails', async () => {
        mockAuthStore.token = 'mock-token';
        mockAuthStore.user = null;

        mockGetDetailProfile.mockRejectedValue('Error');

        await admin(mockRoute, mockFromRoute);

        expect(mockGetDetailProfile).toHaveBeenCalled();
        expect(toast.error).toHaveBeenCalledWith('Your session has expired. Please login again.');
        expect(mockAuthStore.logout).toHaveBeenCalled();
        expect(navigateTo).toHaveBeenCalledWith({ name: 'login' });
    });
});
