import type { UseMutationOptions } from '@tanstack/vue-query';
import type { GeneralConfigDetail } from '~/models/GeneralConfig';
import type { ErrorResponse } from '~/types';
import { GeneralConfigServiceImpl } from '~/services/impl/GeneralConfigServiceImpl';

export const useMutationGetGeneralConfigDetail = (
    options?: UseMutationOptions<
        GeneralConfigDetail,
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
