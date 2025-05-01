import type { MeterReadingCalculateDto } from '~/models/dtos/MeterReadingCalculateDto';
import type { MeterReadingDto } from '~/models/dtos/MeterReadingDto';
import type { MeterReadingDetailResponse, MeterReadingListResponse, MeterReadingResponse } from '~/models/MeterReading';
import type { MeterReadingPaginationSearchParams } from '~/models/params/MeterReadingPaginationSearchParams';
import type { GenericPagination } from '~/types';

export type MeterReadingService = {
    getMeterReadingList: (params: MeterReadingPaginationSearchParams) => Promise<GenericPagination<MeterReadingListResponse[]>>;
    getMeterReadingDetail: (id: string) => Promise<MeterReadingDetailResponse>;
    createMeterReading: (data: MeterReadingDto) => Promise<MeterReadingResponse>;
    updateMeterReading: (id: string, data: MeterReadingDto) => Promise<MeterReadingResponse>;
    calculate: (data: MeterReadingCalculateDto) => Promise<MeterReadingResponse>;
    calculateByIdMeterReading: (id: string, data: MeterReadingDto) => Promise<MeterReadingResponse>;
};
