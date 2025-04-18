import type { UseMutationOptions } from '@tanstack/vue-query';
import type { AreaListResponse } from '~/models/Area';
import type { AreaCreateRequest } from '~/services/AreaService';
import { useMutation } from '@tanstack/vue-query';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

export const useMutationCreateArea = (options?: UseMutationOptions<AreaListResponse, Error, AreaCreateRequest>) => {
    const areaService = new AreaServiceImpl();
    return useMutation<AreaListResponse, Error, AreaCreateRequest>({
        mutationFn: request => areaService.createArea(request),
        ...options,
    });
};
