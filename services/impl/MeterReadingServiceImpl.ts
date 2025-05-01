import type { MeterReadingCalculateDto } from '~/models/dtos/MeterReadingCalculateDto';
import type { MeterReadingDto } from '~/models/dtos/MeterReadingDto';
import type { MeterReadingDetailResponse, MeterReadingListResponse, MeterReadingResponse } from '~/models/MeterReading';
import type { MeterReadingPaginationSearchParams } from '~/models/params/MeterReadingPaginationSearchParams';
import type { MeterReadingService } from '~/services/MeterReadingService';
import type { GenericPagination } from '~/types';
import { useNuxtApp } from '#app';
import { MeterReadingEndpoint } from '~/endpoints/MeterReadingEndpoint';

export class MeterReadingServiceImpl implements MeterReadingService {
    async getMeterReadingList(params: MeterReadingPaginationSearchParams): Promise<GenericPagination<MeterReadingListResponse[]>> {
        const mapParams = {
            ...params,
            areaCode: params.areaCode && params.areaCode?.length > 0 ? params.areaCode.join(',') : undefined,
            dateStart: params.dateStart ? formatDateToEpoch(params.dateStart) : undefined,
            dateEnd: params.dateEnd ? formatDateToEpoch(params.dateEnd) : undefined,
        };

        return await useNuxtApp().$api<GenericPagination<MeterReadingListResponse[]>>(MeterReadingEndpoint.LIST, {
            query: {
                ...mapParams,
                page: params.page - 1,
            },
        });
    }

    async getMeterReadingDetail(code: string): Promise<MeterReadingDetailResponse> {
        return await useNuxtApp().$api<MeterReadingDetailResponse>(MeterReadingEndpoint.DETAIL.replace('[id]', code));
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

    updateMeterReading(id: string, data: MeterReadingDto): Promise<MeterReadingResponse> {
        return useNuxtApp().$api<MeterReadingResponse>(
            MeterReadingEndpoint.UPDATE.replace('[id]', id),
            {
                method: 'PUT',
                body: {
                    ...data,
                },
            },
        );
    }

    calculate(params: MeterReadingCalculateDto): Promise<MeterReadingResponse> {
        return useNuxtApp().$api<MeterReadingResponse>(
            MeterReadingEndpoint.CALCULATE,
            {
                method: 'PUT',
                params,
            },
        );
    }

    calculateByIdMeterReading(id: string, params: MeterReadingDto): Promise<MeterReadingResponse> {
        return useNuxtApp().$api<MeterReadingResponse>(
            MeterReadingEndpoint.CALCULATE_BY_ID.replace('[id]', id),
            {
                method: 'PUT',
                params,
            },
        );
    }
}
