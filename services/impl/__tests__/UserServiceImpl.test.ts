import type { UserDetailResponse, UserListResponse, UserResponse } from '~/models/User';
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

            expect(mockApi).toHaveBeenCalledWith(UserEndpoint.LIST, {
                query: expect.objectContaining({
                    page: 1,
                    size: 20,
                    sort: 'title',
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
        it('should fetch user detail by id', async () => {
            const userId = 'test-user';
            const expectedResponse: UserDetailResponse = {
                id: '1',
                username: 'example',
                fullName: 'Eka Yuda',
                type: 'SUPER_ADMIN',
                photoProfile: '',
                lastLogin: 0,
                createdAt: 0,
                updatedAt: 0,
                areas: ['Area 1'],
            };
            mockApi.mockResolvedValueOnce(expectedResponse);

            const result = await service.getUserDetail(userId);

            expect(result).toEqual(expectedResponse);
            expect(mockApi).toHaveBeenCalledWith(UserEndpoint.DETAIL.replace('[id]', userId));
        });

        it('should handle non-existent user id', async () => {
            const nonExistentKey = 'non-existent-user';
            mockApi.mockResolvedValueOnce(null);

            const result = await service.getUserDetail(nonExistentKey);

            expect(result).toBeNull();
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData: UserDto = new UserDto()
                .setUsername('example@gmail.com')
                .setFullName('Eka Yuda')
                .setUserType('SUPER_ADMIN')
                .setAreas(['Area 1', 'Area 2']);

            const expectedResponse: UserResponse = {
                id: '1',
                username: 'example@gmail.com',
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
                UserEndpoint.CREATE,
                {
                    method: 'POST',
                    body: userData,
                },
            );
        });

        it('should handle duplicate user creation', async () => {
            const duplicateUserData = new UserDto()
                .setUsername('example@gmail.com')
                .setFullName('Eka Yuda')
                .setUserType('SUPER_ADMIN')
                .setAreas(['Area 1', 'Area 2']);

            mockApi.mockRejectedValueOnce(new Error('User with this username already exists'));

            await expect(service.createUser(duplicateUserData)).rejects.toThrow('User with this username already exists');
        });
    });

    describe('updateUser', () => {
        it('should update an existing user', async () => {
            const userId = '1';
            const userData: UserDto = new UserDto()
                .setFullName('Dwi Yudi')
                .setAreas(['Area 1', 'Area 2']);
            const expectedResponse: UserResponse = {
                id: '1',
                username: 'example@gmail.com',
                fullName: 'Dwi Yudi',
                type: 'SUPER_ADMIN',
                photoProfile: '',
                lastLogin: 0,
                createdAt: 0,
                updatedAt: 0,
                areas: ['Area 1', 'Area 2'],
            };
            mockApi.mockResolvedValueOnce(expectedResponse);

            const result = await service.updateUser(userId, userData);

            expect(result).toEqual(expectedResponse);
            expect(mockApi).toHaveBeenCalledWith(
                UserEndpoint.UPDATE.replace('[id]', userId),
                {
                    method: 'PUT',
                    body: userData,
                },
            );
        });

        it('should handle non-existent user update', async () => {
            const nonExistentId = '999';
            const userData = new UserDto()
                .setFullName('Dwi Yudi')
                .setAreas(['Area 1', 'Area 2']);

            mockApi.mockRejectedValueOnce(new Error('User not found'));

            await expect(service.updateUser(nonExistentId, userData)).rejects.toThrow('User not found');
        });
    });
});
