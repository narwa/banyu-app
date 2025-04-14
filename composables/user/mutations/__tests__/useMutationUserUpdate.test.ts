import type { VueWrapper } from '@vue/test-utils';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, ref } from 'vue';
import { UserDto } from '~/models/dtos/UserDto';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';
import { useMutationUserUpdate } from '../useMutationUserUpdate';

const spyOnUpdateUser = vi.spyOn(UserServiceImpl.prototype, 'updateUser').mockReturnValue(Promise.resolve({
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

describe('useMutationUserUpdate', () => {
    const blogId = ref('1');
    const useMutationUserUpdateComponent = defineComponent({
        setup() {
            return { ...useMutationUserUpdate(blogId) };
        },
        template: '<div></div>',
    });

    let useMutationUserUpdateWrapper: VueWrapper<InstanceType<typeof useMutationUserUpdateComponent>>;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        useMutationUserUpdateWrapper = shallowMount(useMutationUserUpdateComponent);
    });

    afterEach(() => {
        useMutationUserUpdateWrapper.unmount();
    });

    it('should expose the correct properties', () => {
        expect(useMutationUserUpdateWrapper.vm).toHaveProperty('mutateAsync');
        expect(useMutationUserUpdateWrapper.vm.error).toBeDefined();
    });

    it('should handle update blog correctly', async () => {
        const payload = new UserDto().setFullName('Eka Yuda 1').setUsername('ecountergg1').setUserType('SUPER_ADMIN').setAreas(['Area 1']);

        expect(spyOnUpdateUser).toHaveBeenCalledTimes(0);

        useMutationUserUpdateWrapper.vm.mutateAsync(payload);

        expect(useMutationUserUpdateWrapper.vm.isPending).toBe(true);

        await flushPromises();

        expect(spyOnUpdateUser).toHaveBeenCalledTimes(1);
        expect(spyOnUpdateUser).toHaveBeenCalledWith('1', payload);
        expect(useMutationUserUpdateWrapper.vm.isPending).toBe(false);
    });

    it('should handle error when update blog fails', async () => {
        const error = new Error('Failed to update blog');
        spyOnUpdateUser.mockRejectedValueOnce(error);

        const payload = new UserDto().setFullName('Eka Yuda 2').setUsername('ecountergg2').setUserType('SUPER_ADMIN').setAreas(['Area 2']);

        await expect(useMutationUserUpdateWrapper.vm.mutateAsync(payload))
            .rejects
            .toThrow('Failed to update blog');
        expect(useMutationUserUpdateWrapper.vm.error).toBeTruthy();
        expect(spyOnUpdateUser).toHaveBeenCalledWith('1', payload);
    });

    it('should reset error state after successful mutation', async () => {
        spyOnUpdateUser.mockRejectedValueOnce(new Error('Failed to update blog'));
        const errorPayload = new UserDto().setFullName('Eka Yuda 3').setUsername('ecountergg3').setUserType('SUPER_ADMIN').setAreas(['Area 3']);

        await expect(useMutationUserUpdateWrapper.vm.mutateAsync(errorPayload))
            .rejects
            .toThrow();
        expect(useMutationUserUpdateWrapper.vm.error).toBeTruthy();

        spyOnUpdateUser.mockResolvedValueOnce({ id: '4', username: 'ecountergg4', fullName: 'Eka Yuda 4', type: 'SUPER_ADMIN', photoProfile: '', lastLogin: 0, createdAt: 0, updatedAt: 0, areas: ['Area 4'] });
        const successPayload = new UserDto().setFullName('Eka Yuda 4').setUsername('ecountergg4').setUserType('SUPER_ADMIN').setAreas(['Area 4']);

        await useMutationUserUpdateWrapper.vm.mutateAsync(successPayload);
        expect(useMutationUserUpdateWrapper.vm.error).toBeNull();
    });

    it('should handle multiple successive updates correctly', async () => {
        spyOnUpdateUser.mockResolvedValueOnce({ id: '5', username: 'ecountergg5', fullName: 'Eka Yuda 5', type: 'SUPER_ADMIN', photoProfile: '', lastLogin: 0, createdAt: 0, updatedAt: 0, areas: ['Area 5'] });
        spyOnUpdateUser.mockResolvedValueOnce({ id: '6', username: 'ecountergg6', fullName: 'Eka Yuda 6', type: 'SUPER_ADMIN', photoProfile: '', lastLogin: 0, createdAt: 0, updatedAt: 0, areas: ['Area 6'] });

        const payload1 = new UserDto().setFullName('Eka Yuda 5').setUsername('ecountergg5').setUserType('SUPER_ADMIN').setAreas(['Area 5']);
        const payload2 = new UserDto().setFullName('Eka Yuda 6').setUsername('ecountergg6').setUserType('SUPER_ADMIN').setAreas(['Area 6']);

        await useMutationUserUpdateWrapper.vm.mutateAsync(payload1);
        await useMutationUserUpdateWrapper.vm.mutateAsync(payload2);

        expect(spyOnUpdateUser).toHaveBeenCalledTimes(2);
        expect(spyOnUpdateUser).toHaveBeenNthCalledWith(1, '1', payload1);
        expect(spyOnUpdateUser).toHaveBeenNthCalledWith(2, '1', payload2);
    });
});
