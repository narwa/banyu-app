import type { VueWrapper } from '@vue/test-utils';
import type { UserDetail } from '~/models/User';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent } from 'vue';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';
import { useMutationGetUserDetail } from '../useQueryUserDetail';

const mockUserDetail: UserDetail = {
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

const spyOnGetUserDetail = vi.spyOn(UserServiceImpl.prototype, 'getUserDetail').mockResolvedValue(mockUserDetail);

describe('useMutationGetUserDetail', () => {
    const useMutationGetUserDetailComponent = defineComponent({
        setup() {
            return { ...useMutationGetUserDetail() };
        },
        template: '<div></div>',
    });

    let useMutationGetUserDetailwrapper: VueWrapper<InstanceType<typeof useMutationGetUserDetailComponent>>;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        useMutationGetUserDetailwrapper = shallowMount(useMutationGetUserDetailComponent);
    });

    afterEach(() => {
        useMutationGetUserDetailwrapper.unmount();
    });

    it('should expose the correct properties', () => {
        expect(useMutationGetUserDetailwrapper.vm).toHaveProperty('mutate');
        expect(useMutationGetUserDetailwrapper.vm).toBeDefined();
    });

    it('should fetch user detail correctly', async () => {
        const id = 'test-user-1';

        expect(spyOnGetUserDetail).toHaveBeenCalledTimes(0);

        useMutationGetUserDetailwrapper.vm.mutateAsync({ id });

        expect(useMutationGetUserDetailwrapper.vm.isPending).toBe(true);

        await flushPromises();

        expect(spyOnGetUserDetail).toHaveBeenCalledTimes(1);
        expect(spyOnGetUserDetail).toHaveBeenCalledWith(id);
        expect(useMutationGetUserDetailwrapper.vm.isPending).toBe(false);
    });

    it('should handle error when fetching user detail fails', async () => {
        const error = new Error('Failed to fetch user detail');
        spyOnGetUserDetail.mockRejectedValueOnce(error);

        const id = 'non-existent';

        await expect(useMutationGetUserDetailwrapper.vm.mutateAsync({ id })).rejects.toThrowError(error);

        expect(spyOnGetUserDetail).toHaveBeenCalledWith(id);
    });

    it('should reset mutation state when reset is called', async () => {
        spyOnGetUserDetail.mockRejectedValueOnce(new Error('Failed to fetch user detail'));
        const errorId = 'error-user-1';

        await expect(useMutationGetUserDetailwrapper.vm.mutateAsync({ id: errorId })).rejects.toThrowError(
            'Failed to fetch user detail',
        );

        useMutationGetUserDetailwrapper.vm.reset();
    });
});
