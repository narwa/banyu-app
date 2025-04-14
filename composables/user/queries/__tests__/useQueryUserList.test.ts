import type { VueWrapper } from '@vue/test-utils';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, reactive, ref } from 'vue';
import { UserPaginationSearchParams } from '~/models/params/UserPaginationSearchParams';
import { UserServiceImpl } from '~/services/impl/UserServiceImpl';
import { useQueryUserList } from '../useQueryUserList';

const spyOnGetUserList = vi.spyOn(UserServiceImpl.prototype, 'getUserList').mockReturnValue(Promise.resolve({
    data: [
        {
            id: '1',
            username: 'ecountergg',
            fullName: 'Eka Yuda',
        },
    ],
    elements: 1,
    pages: 1,
}) as any);

describe('useQueryUserList', () => {
    const useQueryUserListComponent = defineComponent({
        setup() {
            const params = reactive(new UserPaginationSearchParams());
            const searchCount = ref(0);

            const { data, total, results, ...query } = useQueryUserList(params, searchCount);

            return { data, params, searchCount, total, results, ...query };
        },
        template: '<div></div>',
    });

    let useQueryUserListWrapper: VueWrapper<InstanceType<typeof useQueryUserListComponent>>;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        useQueryUserListWrapper = shallowMount(useQueryUserListComponent);
    });

    afterEach(() => {
        useQueryUserListWrapper.unmount();
    });

    it('should expose the correct properties', () => {
        expect(useQueryUserListWrapper.vm).toHaveProperty('data');
        expect(useQueryUserListWrapper.vm).toHaveProperty('params');
        expect(useQueryUserListWrapper.vm).toHaveProperty('searchCount');
        expect(useQueryUserListWrapper.vm).toHaveProperty('total');
        expect(useQueryUserListWrapper.vm).toHaveProperty('results');
        expect(useQueryUserListWrapper.vm).toHaveProperty('isLoading');
        expect(useQueryUserListWrapper.vm).toHaveProperty('error');
    });

    it('should fetch User list correctly', async () => {
        expect(spyOnGetUserList).toHaveBeenCalledTimes(1);

        await flushPromises();

        expect(useQueryUserListWrapper.vm.isLoading).toBe(false);
        expect(useQueryUserListWrapper.vm.error).toBeNull();
        expect(useQueryUserListWrapper.vm.data).toBeDefined();
        expect(useQueryUserListWrapper.vm.total).toBe(1);
        expect(useQueryUserListWrapper.vm.results).toHaveLength(1);
        expect(useQueryUserListWrapper.vm.results[0]).toEqual(expect.objectContaining({
            id: '1',
            username: 'ecountergg',
            fullName: 'Eka Yuda',
        }));
    });

    it('should handle error when fetching User list fails', async () => {
        const error = new Error('Failed to fetch User list');
        spyOnGetUserList.mockRejectedValueOnce(error);

        useQueryUserListWrapper = shallowMount(useQueryUserListComponent);

        await flushPromises();

        expect(useQueryUserListWrapper.vm.error).toBeTruthy();
        expect(useQueryUserListWrapper.vm.isLoading).toBe(false);
    });

    it('should refetch when search count changes', async () => {
        await flushPromises();
        expect(spyOnGetUserList).toHaveBeenCalledTimes(1);

        useQueryUserListWrapper.vm.searchCount++;
        await flushPromises();

        expect(spyOnGetUserList).toHaveBeenCalledTimes(2);
    });

    it('should refetch when params change', async () => {
        await flushPromises();
        expect(spyOnGetUserList).toHaveBeenCalledTimes(1);

        useQueryUserListWrapper.vm.params.page = 2;
        await flushPromises();

        expect(spyOnGetUserList).toHaveBeenCalledTimes(2);
        expect(spyOnGetUserList).toHaveBeenLastCalledWith(
            expect.objectContaining({ page: 2, status: ['PUBLISHED', 'DRAFT', 'ARCHIVED'] }),
        );
    });
});
