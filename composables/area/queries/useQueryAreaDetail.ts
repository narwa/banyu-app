import type { UseMutationOptions } from '@tanstack/vue-query';
import type { AreaDetailResponse } from '~/models/Area';
import { useMutation } from '@tanstack/vue-query';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

export const useMutationGetAreaDetail = (options?: UseMutationOptions<AreaDetailResponse, Error, string>) => {
    const areaService = new AreaServiceImpl();
    return useMutation<AreaDetailResponse, Error, string>({
        mutationFn: (areaCode: string) => areaService.getAreaDetail(areaCode),
        ...options,
    });
};
