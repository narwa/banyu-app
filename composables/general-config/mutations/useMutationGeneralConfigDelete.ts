import type { UseMutationOptions } from '@tanstack/vue-query';
import type { GeneralConfigResponse } from '~/models/GeneralConfig';
import type { ErrorResponse } from '~/types';
import { GeneralConfigServiceImpl } from '~/services/impl/GeneralConfigServiceImpl';

export const useMutationGeneralConfigDelete = (
    options?: UseMutationOptions<
        GeneralConfigResponse,
        ErrorResponse,
        string,
        unknown
    >,
) => {
    const generalConfigService = new GeneralConfigServiceImpl();
    return useMutation({
        mutationFn: (code: string) => generalConfigService.deleteGeneralConfig(toValue(code)),
        ...options,
    });
};
