import type { UseMutationOptions } from '@tanstack/vue-query';
import type { AreaListResponse } from '~/models/Area';
import type { AreaUpdateRequest } from '~/services/AreaService';
import { useMutation } from '@tanstack/vue-query';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

export const useMutationUpdateArea = (options?: UseMutationOptions<AreaListResponse, Error, AreaUpdateRequest>) => {
    const areaService = new AreaServiceImpl();
    return useMutation<AreaListResponse, Error, AreaUpdateRequest>({
        mutationFn: request => areaService.updateArea(request),
        ...options,
    });
};
