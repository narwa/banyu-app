import type { Mock } from 'vitest';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAPI } from '~/composables/useAPI';
import { authService } from '../AuthService';

vi.mock('firebase/auth', () => ({
    getAuth: vi.fn(),
    signInWithPopup: vi.fn(),
    GoogleAuthProvider: vi.fn(),
}));

vi.mock('~/composables/useAPI', () => ({
    useAPI: vi.fn(),
}));

describe('authService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('loginFirebase', () => {
        it('should call Firebase authentication with Google provider', async () => {
            const mockAuth = { name: 'mockAuth' };
            const mockProvider = { name: 'mockProvider' };
            const mockResult = { user: { uid: '123' } };

            (getAuth as Mock).mockReturnValue(mockAuth);
            (GoogleAuthProvider as any).mockImplementation(() => mockProvider);
            (signInWithPopup as Mock).mockResolvedValue(mockResult);

            const service = authService();
            const result = await service.loginFirebase();

            expect(getAuth).toHaveBeenCalled();
            expect(GoogleAuthProvider).toHaveBeenCalled();
            expect(signInWithPopup).toHaveBeenCalledWith(mockAuth, mockProvider);
            expect(result).toEqual(mockResult);
        });

        it('should handle Firebase authentication error', async () => {
            const error = new Error('Firebase Auth Error');
            (signInWithPopup as any).mockRejectedValue(error);

            const service = authService();
            await expect(service.loginFirebase()).rejects.toThrow('Firebase Auth Error');
        });
    });

    describe('loginAuth', () => {
        it('should call API with correct parameters', async () => {
            const mockToken = 'test-token';
            const mockResponse = { token: 'api-token', user: { id: 1 } };

            (useAPI as Mock).mockResolvedValue(mockResponse);

            const service = authService();
            const result = await service.loginAuth(mockToken);

            expect(useAPI).toHaveBeenCalledWith(
                expect.any(String),
                {
                    method: 'POST',
                    headers: {
                        firebaseToken: `Bearer ${mockToken}`,
                    },
                },
            );
            expect(result).toEqual(mockResponse);
        });

        it('should handle API error', async () => {
            const error = new Error('API Error');
            (useAPI as Mock).mockRejectedValue(error);

            const service = authService();
            await expect(service.loginAuth('test-token')).rejects.toThrow('API Error');
        });
    });
});
