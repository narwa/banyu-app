import type { AreaListResponse } from '~/models/Area';
import type { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import type { AreaCreateRequest, AreaService, AreaUpdateRequest } from '~/services/AreaService';
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
        return await useNuxtApp().$api<AreaListResponse>(AreaEndpoint.AREA_DETAIL.replace('[key]', code));
    }

    async createArea(request: AreaCreateRequest): Promise<AreaListResponse> {
        return await useNuxtApp().$api<AreaListResponse>(
            AreaEndpoint.AREA_CREATE,
            {
                method: 'POST',
                body: request,
            },
        );
    }

    async updateArea(request: AreaUpdateRequest): Promise<AreaListResponse> {
        return await useNuxtApp().$api<AreaListResponse>(
            AreaEndpoint.AREA_UPDATE.replace('[key]', request.code),
            {
                method: 'PUT',
                body: request,
            },
        );
    }

    async deleteArea(code: string): Promise<void> {
        await useNuxtApp().$api(
            AreaEndpoint.AREA_DELETE.replace('[key]', code),
            {
                method: 'DELETE',
            },
        );
    }
}
