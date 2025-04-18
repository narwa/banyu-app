import type { UseMutationOptions } from '@tanstack/vue-query';
import type { AreaListResponse } from '~/models/Area';
import type { AreaDto } from '~/models/dtos/AreaDto';
import { useMutation } from '@tanstack/vue-query';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

export const useMutationAreaCreate = (options?: UseMutationOptions<AreaListResponse, Error, AreaDto>) => {
    const areaService = new AreaServiceImpl();
    return useMutation<AreaListResponse, Error, AreaDto>({
        mutationFn: request => areaService.createArea(request),
        ...options,
    });
};
