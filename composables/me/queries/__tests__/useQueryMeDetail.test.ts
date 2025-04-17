import type { VueWrapper } from '@vue/test-utils';
import type { Me } from '~/models/Me';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent } from 'vue';
import { MeServiceImpl } from '~/services/impl/MeServiceImpl';
import { useMutationGetMeDetail } from '../useQueryMeDetail';

const mockMeDetail: Me = {
    username: 'ecountergg',
    fullName: 'Eka Yuda',
    userType: 'SUPER_ADMIN',
    userTypeId: '1',
    lastUpdateBy: '',
    photoProfile: '',
    lastLogin: 0,
    createdAt: 0,
};

const spyOnGetMeDetail = vi.spyOn(MeServiceImpl.prototype, 'getMe').mockResolvedValue(mockMeDetail);

describe('useMutationGetMeDetail', () => {
    const useMutationGetMeDetailComponent = defineComponent({
        setup() {
            return { ...useMutationGetMeDetail() };
        },
        template: '<div></div>',
    });

    let useMutationGetMeDetailwrapper: VueWrapper<InstanceType<typeof useMutationGetMeDetailComponent>>;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        useMutationGetMeDetailwrapper = shallowMount(useMutationGetMeDetailComponent);
    });

    afterEach(() => {
        useMutationGetMeDetailwrapper.unmount();
    });

    it('should expose the correct properties', () => {
        expect(useMutationGetMeDetailwrapper.vm).toHaveProperty('mutate');
        expect(useMutationGetMeDetailwrapper.vm).toBeDefined();
    });

    it('should fetch user detail correctly', async () => {
        expect(spyOnGetMeDetail).toHaveBeenCalledTimes(0);

        useMutationGetMeDetailwrapper.vm.mutateAsync();

        expect(useMutationGetMeDetailwrapper.vm.isPending).toBe(true);

        await flushPromises();

        expect(spyOnGetMeDetail).toHaveBeenCalledTimes(1);
        expect(spyOnGetMeDetail).toHaveBeenCalledWith();
        expect(useMutationGetMeDetailwrapper.vm.isPending).toBe(false);
    });

    it('should handle error when fetching user detail fails', async () => {
        const error = new Error('Failed to fetch user detail');
        spyOnGetMeDetail.mockRejectedValueOnce(error);

        const id = 'non-existent';

        await expect(useMutationGetMeDetailwrapper.vm.mutateAsync()).rejects.toThrowError(error);

        expect(spyOnGetMeDetail).toHaveBeenCalledWith(id);
    });

    it('should reset mutation state when reset is called', async () => {
        spyOnGetMeDetail.mockRejectedValueOnce(new Error('Failed to fetch user detail'));

        await expect(useMutationGetMeDetailwrapper.vm.mutateAsync()).rejects.toThrowError(
            'Failed to fetch user detail',
        );

        useMutationGetMeDetailwrapper.vm.reset();
    });
});
