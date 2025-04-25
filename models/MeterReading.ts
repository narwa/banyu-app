import type { ReadingStatus } from '~/types';

export type MeterReadingListResponse = {
    id: string;
    meterNumber: string;
    readingDate: number;
    consumption: number;
    month: number;
    year: number;
    readingStatus: ReadingStatus;
    areaCode: string;
    memberFullName: string;
    createdDate: number;
    lastModifiedDate: number;
    version: number;
};
export type MeterReadingDetailResponse = Omit<MeterReadingListResponse, 'readingStatus'> & {
    areaDescription: string;
    currentReading: number;
    memberEmail: string;
    memberId: string;
    memberMobileNumber: string;
    notes: string;
    previousReading: number;
    status: ReadingStatus;
};
export type MeterReadingResponse = MeterReadingListResponse;
