import type { UseMutationOptions } from '@tanstack/vue-query';
import { useMutation } from '@tanstack/vue-query';
import { AreaServiceImpl } from '~/services/impl/AreaServiceImpl';

type DeleteAreaParams = {
    areaCode: string;
};

export const useMutationDeleteArea = (options?: UseMutationOptions<void, Error, DeleteAreaParams>) => {
    const areaService = new AreaServiceImpl();
    return useMutation<void, Error, DeleteAreaParams>({
        mutationFn: ({ areaCode }) => areaService.deleteArea(areaCode),
        ...options,
    });
};
