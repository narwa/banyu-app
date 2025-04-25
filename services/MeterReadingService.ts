import type { MeterReadingDto } from '~/models/dtos/MeterReadingDto';
import type { MeterReadingDetailResponse, MeterReadingListResponse, MeterReadingResponse } from '~/models/MeterReading';
import type { MeterReadingPaginationSearchParams } from '~/models/params/MeterReadingPaginationSearchParams';
import type { GenericPagination } from '~/types';

export type MeterReadingService = {
    getMeterReadingList: (params: MeterReadingPaginationSearchParams) => Promise<GenericPagination<MeterReadingListResponse[]>>;
    getMeterReadingDetail: (code: string) => Promise<MeterReadingDetailResponse>;
    createMeterReading: (data: MeterReadingDto) => Promise<MeterReadingResponse>;
    updateMeterReading: (code: string, data: MeterReadingDto) => Promise<MeterReadingResponse>;
    deleteMeterReading: (code: string) => Promise<MeterReadingResponse>;
};
