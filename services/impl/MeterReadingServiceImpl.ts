import type { MeterReadingDto } from '~/models/dtos/MeterReadingDto';
import type { MeterReadingDetailResponse, MeterReadingListResponse, MeterReadingResponse } from '~/models/MeterReading';
import type { MeterReadingPaginationSearchParams } from '~/models/params/MeterReadingPaginationSearchParams';
import type { MeterReadingService } from '~/services/MeterReadingService';
import type { GenericPagination } from '~/types';
import { useNuxtApp } from '#app';
import { MeterReadingEndpoint } from '~/endpoints/MeterReadingEndpoint';

export class MeterReadingServiceImpl implements MeterReadingService {
    async getMeterReadingList(params: MeterReadingPaginationSearchParams): Promise<GenericPagination<MeterReadingListResponse[]>> {
        return await useNuxtApp().$api<GenericPagination<MeterReadingListResponse[]>>(MeterReadingEndpoint.LIST, {
            query: {
                ...params,
                page: params.page - 1,
            },
        });
    }

    async getMeterReadingDetail(code: string): Promise<MeterReadingDetailResponse> {
        return await useNuxtApp().$api<MeterReadingDetailResponse>(MeterReadingEndpoint.DETAIL.replace('[code]', code));
    }

    createMeterReading(data: MeterReadingDto): Promise<MeterReadingResponse> {
        return useNuxtApp().$api<MeterReadingResponse>(
            MeterReadingEndpoint.CREATE,
            {
                method: 'POST',
                body: {
                    ...data,
                },
            },
        );
    }

    updateMeterReading(code: string, data: MeterReadingDto): Promise<MeterReadingResponse> {
        return useNuxtApp().$api<MeterReadingResponse>(
            MeterReadingEndpoint.UPDATE.replace('[code]', code),
            {
                method: 'PUT',
                body: {
                    ...data,
                },
            },
        );
    }

    deleteMeterReading(code: string): Promise<MeterReadingResponse> {
        return useNuxtApp().$api<MeterReadingResponse>(
            MeterReadingEndpoint.DELETE.replace('[code]', code),
            {
                method: 'DELETE',
            },
        );
    }
}
