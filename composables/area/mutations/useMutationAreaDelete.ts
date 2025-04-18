import type { UseMutationOptions } from '@tanstack/vue-query';
import type { AreaResponse } from '~/models/Area';
import type { ErrorResponse } from '~/types';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

export const useMutationAreaDelete = (
    options?: UseMutationOptions<
        AreaResponse,
        ErrorResponse,
        string,
        unknown
    >,
) => {
    const areaService = new AreaServiceImpl();
    return useMutation({
        mutationFn: (code: string) => areaService.deleteArea(toValue(code)),
        ...options,
    });
};
