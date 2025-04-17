import type { UseMutationOptions } from '@tanstack/vue-query';
import type { GeneralConfigDto } from '~/models/dtos/GeneralConfigDto';
import type { GeneralConfigResponse } from '~/models/GeneralConfig';
import type { ErrorResponse } from '~/types';
import { GeneralConfigServiceImpl } from '~/services/impl/GeneralConfigServiceImpl';

export const useMutationGeneralConfigCreate = (
    options?: UseMutationOptions<
        GeneralConfigResponse,
        ErrorResponse,
        GeneralConfigDto,
        unknown
    >,
) => {
    const generalConfigService = new GeneralConfigServiceImpl();
    return useMutation({
        mutationFn: (data: GeneralConfigDto) => generalConfigService.createGeneralConfig(data),
        ...options,
    });
};
