import type { AreaDetailResponse, AreaListResponse, AreaResponse } from '~/models/Area';
import type { AreaDto } from '~/models/dtos/AreaDto';
import type { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import type { AreaService } from '~/services/AreaService';
import type { GenericPagination } from '~/types';
import { useNuxtApp } from '#app';
import { AreaEndpoint } from '~/endpoints/AreaEndpoint';

export class AreaServiceImpl implements AreaService {
    async getAreaList(params: PaginationSearchParam): Promise<GenericPagination<AreaListResponse[]>> {
        return await useNuxtApp().$api<GenericPagination<AreaListResponse[]>>(AreaEndpoint.LIST, {
            query: {
                ...params,
                page: params.page - 1,
            },
        });
    }

    async getAreaDetail(code: string): Promise<AreaDetailResponse> {
        return await useNuxtApp().$api<AreaDetailResponse>(AreaEndpoint.DETAIL.replace('[code]', code));
    }

    createArea(data: AreaDto): Promise<AreaResponse> {
        return useNuxtApp().$api<AreaResponse>(
            AreaEndpoint.CREATE,
            {
                method: 'POST',
                body: {
                    ...data,
                },
            },
        );
    }

    updateArea(code: string, data: AreaDto): Promise<AreaResponse> {
        return useNuxtApp().$api<AreaResponse>(
            AreaEndpoint.UPDATE.replace('[code]', code),
            {
                method: 'PUT',
                body: {
                    ...data,
                },
            },
        );
    }

    deleteArea(code: string): Promise<AreaResponse> {
        return useNuxtApp().$api<AreaResponse>(
            AreaEndpoint.DELETE.replace('[code]', code),
            {
                method: 'DELETE',
            },
        );
    }
}
