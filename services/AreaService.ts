import type { AreaListResponse } from '~/models/Area';
import type { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import type { GenericPagination } from '~/types';

export type AreaService = {
    getAreaList: (params: PaginationSearchParam) => Promise<GenericPagination<AreaListResponse[]>>;
    getAreaDetail: (code: string) => Promise<AreaListResponse>;
};
