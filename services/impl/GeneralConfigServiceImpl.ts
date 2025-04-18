import type { GeneralConfigDto } from '~/models/dtos/GeneralConfigDto';
import type { GeneralConfigDetailResponse, GeneralConfigListResponse, GeneralConfigResponse } from '~/models/GeneralConfig';
import type { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import type { GeneralConfigService } from '~/services/GeneralConfigService';
import type { GenericPagination } from '~/types';
import { useNuxtApp } from '#app';
import { GeneralConfigEndpoint } from '~/endpoints/GeneralConfigEndpoint';

export class GeneralConfigServiceImpl implements GeneralConfigService {
    async getGeneralConfigList(params: PaginationSearchParam): Promise<GenericPagination<GeneralConfigListResponse[]>> {
        return await useNuxtApp().$api<GenericPagination<GeneralConfigListResponse[]>>(GeneralConfigEndpoint.LIST, {
            query: {
                ...params,
                page: params.page - 1,
            },
        });
    }

    async getGeneralConfigDetail(code: string): Promise<GeneralConfigDetailResponse> {
        return await useNuxtApp().$api<GeneralConfigDetailResponse>(GeneralConfigEndpoint.DETAIL.replace('[code]', code));
    }

    createGeneralConfig(data: GeneralConfigDto): Promise<GeneralConfigResponse> {
        return useNuxtApp().$api<GeneralConfigResponse>(
            GeneralConfigEndpoint.CREATE,
            {
                method: 'POST',
                body: {
                    ...data,
                },
            },
        );
    }

    updateGeneralConfig(code: string, data: GeneralConfigDto): Promise<GeneralConfigResponse> {
        return useNuxtApp().$api<GeneralConfigResponse>(
            GeneralConfigEndpoint.UPDATE.replace('[code]', code),
            {
                method: 'PUT',
                body: {
                    ...data,
                },
            },
        );
    }

    deleteGeneralConfig(code: string): Promise<GeneralConfigResponse> {
        return useNuxtApp().$api<GeneralConfigResponse>(
            GeneralConfigEndpoint.DELETE.replace('[code]', code),
            {
                method: 'DELETE',
            },
        );
    }
}
