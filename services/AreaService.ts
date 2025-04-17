import type { AreaListResponse } from '~/models/Area';
import type { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import type { GenericPagination } from '~/types';

export type AreaUpdateRequest = {
    code: string;
    description: string;
    rates: {
        tierStart: number;
        tierEnd: number | null;
        ratePerUnit: number;
    }[];
};

export type AreaCreateRequest = {
    code: string;
    description: string;
    rates: {
        tierStart: number;
        tierEnd: number | null;
        ratePerUnit: number;
    }[];
};

export type AreaService = {
    getAreaList: (params: PaginationSearchParam) => Promise<GenericPagination<AreaListResponse[]>>;
    getAreaDetail: (code: string) => Promise<AreaListResponse>;
    createArea: (request: AreaCreateRequest) => Promise<AreaListResponse>;
    updateArea: (request: AreaUpdateRequest) => Promise<AreaListResponse>;
    deleteArea: (code: string) => Promise<void>;
};
