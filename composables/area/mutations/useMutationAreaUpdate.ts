import type { UseMutationOptions } from '@tanstack/vue-query';
import type { AreaResponse } from '~/models/Area';
import type { AreaDto } from '~/models/dtos/AreaDto';
import type { ErrorResponse } from '~/types';

import { useMutation } from '@tanstack/vue-query';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

export const useMutationAreaUpdate = (
    code: MaybeRef<string>,
    options?: UseMutationOptions<
        AreaResponse,
        ErrorResponse,
        AreaDto,
        unknown
    >,
) => {
    const areaService = new AreaServiceImpl();
    return useMutation({
        mutationFn: (data: AreaDto) => areaService.updateArea(toValue(code), data),
        ...options,
    });
};
