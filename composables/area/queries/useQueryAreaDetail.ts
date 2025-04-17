import type { UseMutationOptions } from '@tanstack/vue-query';
import type { AreaListResponse } from '~/models/Area';
import { useMutation } from '@tanstack/vue-query';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

type AreaDetailParams = {
    areaCode: string;
};

export const useMutationGetAreaDetail = (options?: UseMutationOptions<AreaListResponse, Error, AreaDetailParams>) => {
    const areaService = new AreaServiceImpl();
    return useMutation<AreaListResponse, Error, AreaDetailParams>({
        mutationFn: ({ areaCode }) => areaService.getAreaDetail(areaCode),
        ...options,
    });
};
