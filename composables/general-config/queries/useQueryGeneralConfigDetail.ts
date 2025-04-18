import type { UseMutationOptions } from '@tanstack/vue-query';
import type { GeneralConfigDetailResponse } from '~/models/GeneralConfig';
import type { ErrorResponse } from '~/types';
import { GeneralConfigServiceImpl } from '~/services/impl/GeneralConfigServiceImpl';

export const useMutationGetGeneralConfigDetail = (
    options?: UseMutationOptions<
        GeneralConfigDetailResponse,
        ErrorResponse,
        {
            code: string;
        },
        unknown
    >,
) => {
    const generalConfigService = new GeneralConfigServiceImpl();
    return useMutation({
        mutationFn: ({ code }) => generalConfigService.getGeneralConfigDetail(code),
        ...options,
    });
};
