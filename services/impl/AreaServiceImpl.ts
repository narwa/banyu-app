import type { AreaListResponse } from '~/models/Area';
import type { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import type { AreaService } from '~/services/AreaService';
import type { GenericPagination } from '~/types';
import { useNuxtApp } from '#app';
import { AreaEndpoint } from '~/endpoints/AreaEndpoint';

export class AreaServiceImpl implements AreaService {
    async getAreaList(params: PaginationSearchParam): Promise<GenericPagination<AreaListResponse[]>> {
        return await useNuxtApp().$api<GenericPagination<AreaListResponse[]>>(AreaEndpoint.AREA_LIST, {
            query: {
                ...params,
                page: params.page - 1,
            },
        });
    }

    async getAreaDetail(code: string): Promise<AreaListResponse> {
        return await useNuxtApp().$api<AreaListResponse>(AreaEndpoint.AREA_DETAIL(code));
    }
}
