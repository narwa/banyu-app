import type { GeneralConfigDto } from '~/models/dtos/GeneralConfigDto';
import type { GeneralConfigDetailResponse, GeneralConfigListResponse, GeneralConfigResponse } from '~/models/GeneralConfig';
import type { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import type { GenericPagination } from '~/types';

export type GeneralConfigService = {
    getGeneralConfigList: (params: PaginationSearchParam) => Promise<GenericPagination<GeneralConfigListResponse[]>>;
    getGeneralConfigDetail: (code: string) => Promise<GeneralConfigDetailResponse>;
    createGeneralConfig: (data: GeneralConfigDto) => Promise<GeneralConfigResponse>;
    updateGeneralConfig: (code: string, data: GeneralConfigDto) => Promise<GeneralConfigResponse>;
    deleteGeneralConfig: (code: string) => Promise<GeneralConfigResponse>;
};
