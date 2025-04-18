import type { UseMutationOptions } from '@tanstack/vue-query';
import type { AreaListResponse } from '~/models/Area';
import { useMutation } from '@tanstack/vue-query';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

export const useMutationGetAreaDetail = (options?: UseMutationOptions<AreaListResponse, Error, string>) => {
    const areaService = new AreaServiceImpl();
    return useMutation<AreaListResponse, Error, string>({
        mutationFn: (areaCode: string) => areaService.getAreaDetail(areaCode),
        ...options,
    });
};
