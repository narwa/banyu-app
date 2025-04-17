import type { GeneralConfigDto } from '~/models/dtos/GeneralConfigDto';
import type { GeneralConfigDetail, GeneralConfigListResponse, GeneralConfigResponse } from '~/models/GeneralConfig';
import type { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import type { GenericPagination } from '~/types';

export type GeneralConfigService = {
    getGeneralConfigList: (params: PaginationSearchParam) => Promise<GenericPagination<GeneralConfigListResponse[]>>;
    getGeneralConfigDetail: (id: string) => Promise<GeneralConfigDetail>;
    createGeneralConfig: (data: GeneralConfigDto) => Promise<GeneralConfigResponse>;
    updateGeneralConfig: (id: string, data: GeneralConfigDto) => Promise<GeneralConfigResponse>;
    deleteGeneralConfig: (id: string) => Promise<GeneralConfigResponse>;
};
