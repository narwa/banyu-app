import type { Me } from '~/models/Me';
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MeEndpoint } from '~/endpoints/MeEndpoint';
import { MeServiceImpl } from '~/services/impl/MeServiceImpl';

const mockApi = vi.fn();
vi.mock('#app', () => ({
    useNuxtApp: () => ({
        $api: mockApi,
    }),
}));

describe('meServiceImpl', () => {
    const service = new MeServiceImpl();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        vi.restoreAllMocks();
    });

    describe('getMe', () => {
        it('should fetch me detail by key', async () => {
            const expectedResponse: Me = {
                username: 'ecountergg',
                fullName: 'Eka Yuda',
                userType: 'SUPER_ADMIN',
                userTypeId: '1',
                lastUpdateBy: '',
                photoProfile: '',
                lastLogin: 0,
                createdAt: 0,
            };
            mockApi.mockResolvedValueOnce(expectedResponse);

            const result = await service.getMe();

            expect(result).toEqual(expectedResponse);
            expect(mockApi).toHaveBeenCalledWith(MeEndpoint.GET_PROFILE);
        });

        it('should handle non-existent me key', async () => {
            mockApi.mockResolvedValueOnce(null);

            const result = await service.getMe();

            expect(result).toBeNull();
        });
    });
});
