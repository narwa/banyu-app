import type { UserDetail, UserListResponse, UserResponse } from '~/models/User';
import type { GenericPagination } from '~/types';
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { UserEndpoint } from '~/endpoints/UserEndpoint';
import { UserDto } from '~/models/dtos/UserDto';
import { UserPaginationSearchParams } from '~/models/params/UserPaginationSearchParams';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';

const mockApi = vi.fn();
vi.mock('#app', () => ({
    useNuxtApp: () => ({
        $api: mockApi,
    }),
}));

describe('userServiceImpl', () => {
    const service = new UserServiceImpl();
    const params = new UserPaginationSearchParams();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    afterAll(() => {
        vi.restoreAllMocks();
    });

    describe('getUserList', () => {
        it('should use default constructor values', async () => {
            const expectedResponse: GenericPagination<UserListResponse[]> = {
                data: [],
                elements: 0,
                pages: 0,
            };
            mockApi.mockResolvedValueOnce(expectedResponse);

            const result = await service.getUserList(params);

            expect(result).toEqual(expectedResponse);
        });

        it('should handle pagination parameters', async () => {
            params.setPage(2);
            params.setSize(20);
            params.setSortBy('title');
            params.setDirection('desc');

            mockApi.mockResolvedValueOnce({});

            await service.getUserList(params);

            expect(mockApi).toHaveBeenCalledWith(UserEndpoint.USER_LIST, {
                query: expect.objectContaining({
                    page: 1,
                    size: 20,
                    sortBy: 'title',
                    direction: 'desc',
                }),
            });
        });

        it('should handle API error response', async () => {
            mockApi.mockRejectedValueOnce(new Error('Network error'));

            await expect(service.getUserList(params)).rejects.toThrow('Network error');
        });
    });

    describe('getUserDetail', () => {
        it('should fetch user detail by key', async () => {
            const userKey = 'test-user';
            const expectedResponse: UserDetail = {
                id: '1',
                username: 'ecountergg',
                fullName: 'Eka Yuda',
                type: 'SUPER_ADMIN',
                photoProfile: '',
                lastLogin: 0,
                createdAt: 0,
                updatedAt: 0,
                areas: ['Area 1'],
            };
            mockApi.mockResolvedValueOnce(expectedResponse);

            const result = await service.getUserDetail(userKey);

            expect(result).toEqual(expectedResponse);
            expect(mockApi).toHaveBeenCalledWith(UserEndpoint.USER_DETAIL.replace('[key]', userKey));
        });

        it('should handle non-existent user key', async () => {
            const nonExistentKey = 'non-existent-user';
            mockApi.mockResolvedValueOnce(null);

            const result = await service.getUserDetail(nonExistentKey);

            expect(result).toBeNull();
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData: UserDto = new UserDto()
                .setFullName('Eka Yuda')
                .setAreas(['Area 1', 'Area 2']);

            const expectedResponse: UserResponse = {
                id: '1',
                username: 'ecountergg',
                fullName: 'Eka Yuda',
                type: 'SUPER_ADMIN',
                photoProfile: '',
                lastLogin: 0,
                createdAt: 0,
                updatedAt: 0,
                areas: ['Area 1'],
            };
            mockApi.mockResolvedValueOnce(expectedResponse);

            const result = await service.createUser(userData);

            expect(result).toEqual(expectedResponse);
            expect(mockApi).toHaveBeenCalledWith(
                UserEndpoint.USER_CREATE,
                {
                    method: 'POST',
                    body: userData,
                },
            );
        });

        it('should handle duplicate user creation', async () => {
            const duplicateUserData = new UserDto()
                .setUsername('ecountergg')
                .setFullName('Eka Yuda');

            mockApi.mockRejectedValueOnce(new Error('User with this slug already exists'));

            await expect(service.createUser(duplicateUserData)).rejects.toThrow('User with this slug already exists');
        });
    });

    describe('updateUser', () => {
        it('should update an existing user', async () => {
            const userId = '1';
            const userData: UserDto = new UserDto()
                .setUsername('deerand')
                .setFullName('Dwi Yudi');
            const expectedResponse: UserResponse = {
                id: '2',
                username: 'deerand',
                fullName: 'Dwi Yudi',
                type: 'SUPER_ADMIN',
                photoProfile: '',
                lastLogin: 0,
                createdAt: 0,
                updatedAt: 0,
                areas: ['Area 1'],
            };
            mockApi.mockResolvedValueOnce(expectedResponse);

            const result = await service.updateUser(userId, userData);

            expect(result).toEqual(expectedResponse);
            expect(mockApi).toHaveBeenCalledWith(
                UserEndpoint.USER_UPDATE.replace('[id]', userId),
                {
                    method: 'PUT',
                    body: userData,
                },
            );
        });

        it('should handle non-existent user update', async () => {
            const nonExistentId = '999';
            const userData = new UserDto()
                .setUsername('deerand')
                .setFullName('Dwi Yudi');

            mockApi.mockRejectedValueOnce(new Error('User not found'));

            await expect(service.updateUser(nonExistentId, userData)).rejects.toThrow('User not found');
        });
    });
});
