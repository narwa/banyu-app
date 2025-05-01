import type { AreaDetailResponse, AreaListResponse, AreaResponse } from '~/models/Area';
import type { AreaDto } from '~/models/dtos/AreaDto';
import type { AreaPaginationSearchParams } from '~/models/params/AreaPaginationSearchParams';
import type { GenericPagination } from '~/types';

export type AreaService = {
    getAreaList: (params: AreaPaginationSearchParams) => Promise<GenericPagination<AreaListResponse[]>>;
    getAreaDetail: (code: string) => Promise<AreaDetailResponse>;
    createArea: (data: AreaDto) => Promise<AreaResponse>;
    updateArea: (code: string, data: AreaDto) => Promise<AreaResponse>;
    deleteArea: (code: string) => Promise<AreaResponse>;
};
