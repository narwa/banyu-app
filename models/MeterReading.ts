import type { WaterReadingStatus } from '~/types';

export type MeterReadingListResponse = {
    id: string;
    meterNumber: string;
    readingDate: number;
    consumption: number;
    month: number;
    year: number;
    readingStatus: WaterReadingStatus;
    areaCode: string;
    memberFullName: string;
    createdDate: number;
    lastModifiedDate: number;
    version: number;
};
export type MeterReadingDetailResponse = Omit<MeterReadingListResponse, 'readingStatus'> & {
    areaDescription: string;
    currentReading: number;
    previousReading: number;
    memberEmail: string;
    memberId: string;
    memberMobileNumber: string;
    notes: string;
    status: WaterReadingStatus;
};
export type MeterReadingResponse = MeterReadingListResponse;
