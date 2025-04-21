import type { Status } from '~/types';

export type MemberListResponse = {
    id: string;
    areaCode: string;
    areaDescription: string;
    fullName: string;
    email: string;
    mobileNumber: string;
    meterNumber: string;
};
export type MemberDetailResponse = MemberListResponse & {
    lastModifiedDate: number;
    meterInstallationDate: number;
    meterStatus: Status;
};
export type MemberResponse = MemberListResponse;
