import type { VueWrapper } from '@vue/test-utils';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { UserDto } from '~/models/dtos/UserDto';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';
import { useMutationUserCreate } from '../useMutationUserCreate';

const spyOnCreateUser = vi.spyOn(UserServiceImpl.prototype, 'createUser').mockReturnValue(Promise.resolve({
    id: '1',
    username: 'ecountergg',
    fullName: 'Eka Yuda',
    type: 'SUPER_ADMIN',
    lastUpdateBy: '',
    photoProfile: '',
    lastLogin: 0,
    createdAt: 0,
    updatedAt: 0,
    areas: ['Area 1'],
}));

describe('useMutationUserCreate', () => {
    const useMutationUserCreateComponent = defineComponent({
        setup() {
            return { ...useMutationUserCreate() };
        },
        template: '<div></div>',
    });

    let useMutationUserCreateWrapper: VueWrapper<InstanceType<typeof useMutationUserCreateComponent>>;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        useMutationUserCreateWrapper = shallowMount(useMutationUserCreateComponent);
    });

    afterEach(() => {
        useMutationUserCreateWrapper.unmount();
    });

    it('should expose the correct properties', () => {
        expect(useMutationUserCreateWrapper.vm).toHaveProperty('mutateAsync');
        expect(useMutationUserCreateWrapper.vm.error).toBeDefined();
    });

    it('should handle create blog correctly', async () => {
        const payload = new UserDto().setFullName('Eka Yuda 1').setUsername('ecountergg1').setUserType('SUPER_ADMIN').setAreas(['Area 1']);

        expect(spyOnCreateUser).toHaveBeenCalledTimes(0);

        useMutationUserCreateWrapper.vm.mutateAsync(payload);

        expect(useMutationUserCreateWrapper.vm.isPending).toBe(true);

        await flushPromises();

        expect(spyOnCreateUser).toHaveBeenCalledTimes(1);
        expect(spyOnCreateUser).toHaveBeenCalledWith(payload);
        expect(useMutationUserCreateWrapper.vm.isPending).toBe(false);
    });

    it('should handle error when create blog fails', async () => {
        const error = new Error('Failed to create blog');
        spyOnCreateUser.mockRejectedValueOnce(error);

        const payload = new UserDto().setFullName('Eka Yuda 2').setUsername('ecountergg2').setUserType('SUPER_ADMIN').setAreas(['Area 2']);

        await expect(useMutationUserCreateWrapper.vm.mutateAsync(payload)).rejects.toThrow('Failed to create blog');
        expect(useMutationUserCreateWrapper.vm.error).toBeTruthy();
        expect(spyOnCreateUser).toHaveBeenCalledWith(payload);
    });

    it('should reset error state after successful mutation', async () => {
        spyOnCreateUser.mockRejectedValueOnce(new Error('Failed to create blog'));
        const errorPayload = new UserDto().setFullName('Eka Yuda 3').setUsername('ecountergg3').setUserType('SUPER_ADMIN').setAreas(['Area 3']);

        await expect(useMutationUserCreateWrapper.vm.mutateAsync(errorPayload)).rejects.toThrow();
        expect(useMutationUserCreateWrapper.vm.error).toBeTruthy();

        spyOnCreateUser.mockResolvedValueOnce({ id: '4', username: 'ecountergg4', fullName: 'Eka Yuda 4', type: 'SUPER_ADMIN', photoProfile: '', lastLogin: 0, createdAt: 0, updatedAt: 0, areas: ['Area 4'] });
        const successPayload = new UserDto().setFullName('Eka Yuda 4').setUsername('ecountergg4').setUserType('SUPER_ADMIN').setAreas(['Area 4']);

        await useMutationUserCreateWrapper.vm.mutateAsync(successPayload);
        expect(useMutationUserCreateWrapper.vm.error).toBeNull();
    });

    it('should handle multiple successive mutations correctly', async () => {
        spyOnCreateUser.mockResolvedValueOnce({ id: '1', username: 'ecountergg', fullName: 'Eka Yuda', type: 'SUPER_ADMIN', photoProfile: '', lastLogin: 0, createdAt: 0, updatedAt: 0, areas: ['Area 1'] });
        spyOnCreateUser.mockResolvedValueOnce({ id: '1', username: 'ecountergg', fullName: 'Eka Yuda', type: 'SUPER_ADMIN', photoProfile: '', lastLogin: 0, createdAt: 0, updatedAt: 0, areas: ['Area 1'] });

        const payload1 = new UserDto().setFullName('Eka Yuda 5').setUsername('ecountergg5').setUserType('SUPER_ADMIN').setAreas(['Area 5']);
        const payload2 = new UserDto().setFullName('Eka Yuda 6').setUsername('ecountergg6').setUserType('SUPER_ADMIN').setAreas(['Area 6']); ;

        await useMutationUserCreateWrapper.vm.mutateAsync(payload1);
        await useMutationUserCreateWrapper.vm.mutateAsync(payload2);

        expect(spyOnCreateUser).toHaveBeenCalledTimes(2);
        expect(spyOnCreateUser).toHaveBeenNthCalledWith(1, payload1);
        expect(spyOnCreateUser).toHaveBeenNthCalledWith(2, payload2);
    });
});
