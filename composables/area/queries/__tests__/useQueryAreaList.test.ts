import type { VueWrapper } from '@vue/test-utils';
import { flushPromises, shallowMount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { defineComponent, reactive, ref } from 'vue';
import { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';
import { useQueryAreaList } from '../useQueryAreaList';

const spyOnGetAreaList = vi.spyOn(AreaServiceImpl.prototype, 'getAreaList').mockReturnValue(Promise.resolve({
    data: [
        {
            code: 'area-1',
            description: 'Area 1',
            rates: [{
                tierStart: 0,
                tierEnd: 0,
                ratePerUnit: 0,
            }],
        },
    ],
    elements: 1,
    pages: 1,
}) as any);

describe('useQueryAreaList', () => {
    const useQueryAreaListComponent = defineComponent({
        setup() {
            const params = reactive(new PaginationSearchParam());
            const searchCount = ref(0);

            const { data, total, results, ...query } = useQueryAreaList(params, searchCount);

            return { data, params, searchCount, total, results, ...query };
        },
        template: '<div></div>',
    });

    let useQueryAreaListWrapper: VueWrapper<InstanceType<typeof useQueryAreaListComponent>>;

    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        useQueryAreaListWrapper = shallowMount(useQueryAreaListComponent);
    });

    afterEach(() => {
        useQueryAreaListWrapper.unmount();
    });

    it('should expose the correct properties', () => {
        expect(useQueryAreaListWrapper.vm).toHaveProperty('data');
        expect(useQueryAreaListWrapper.vm).toHaveProperty('params');
        expect(useQueryAreaListWrapper.vm).toHaveProperty('searchCount');
        expect(useQueryAreaListWrapper.vm).toHaveProperty('total');
        expect(useQueryAreaListWrapper.vm).toHaveProperty('results');
        expect(useQueryAreaListWrapper.vm).toHaveProperty('isLoading');
        expect(useQueryAreaListWrapper.vm).toHaveProperty('error');
    });

    it('should fetch Area list correctly', async () => {
        expect(spyOnGetAreaList).toHaveBeenCalledTimes(1);

        await flushPromises();

        expect(useQueryAreaListWrapper.vm.isLoading).toBe(false);
        expect(useQueryAreaListWrapper.vm.error).toBeNull();
        expect(useQueryAreaListWrapper.vm.data).toBeDefined();
        expect(useQueryAreaListWrapper.vm.total).toBe(1);
        expect(useQueryAreaListWrapper.vm.results).toHaveLength(1);
        expect(useQueryAreaListWrapper.vm.results[0]).toEqual(expect.objectContaining({
            code: 'area-1',
            description: 'Area 1',
            rates: [{
                tierStart: 0,
                tierEnd: 0,
                ratePerUnit: 0,
            }],
        }));
    });

    it('should handle error when fetching Area list fails', async () => {
        const error = new Error('Failed to fetch Area list');
        spyOnGetAreaList.mockRejectedValueOnce(error);

        useQueryAreaListWrapper = shallowMount(useQueryAreaListComponent);

        await flushPromises();

        expect(useQueryAreaListWrapper.vm.error).toBeTruthy();
        expect(useQueryAreaListWrapper.vm.isLoading).toBe(false);
    });

    it('should refetch when search count changes', async () => {
        await flushPromises();
        expect(spyOnGetAreaList).toHaveBeenCalledTimes(1);

        useQueryAreaListWrapper.vm.searchCount++;
        await flushPromises();

        expect(spyOnGetAreaList).toHaveBeenCalledTimes(2);
    });

    it('should refetch when params change', async () => {
        await flushPromises();
        expect(spyOnGetAreaList).toHaveBeenCalledTimes(1);

        useQueryAreaListWrapper.vm.params.page = 2;
        await flushPromises();

        expect(spyOnGetAreaList).toHaveBeenCalledTimes(2);
        expect(spyOnGetAreaList).toHaveBeenLastCalledWith(
            expect.objectContaining({ page: 2, status: ['PUBLISHED', 'DRAFT', 'ARCHIVED'] }),
        );
    });
});
