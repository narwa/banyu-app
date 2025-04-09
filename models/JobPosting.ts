import type { ContentStatus } from '~/types';

export type JobPostingListResponse = {
    key: string;
    positionName: string;
    status: ContentStatus;
    openStartDate: number;
    openEndDate: number;
    candidateCount: number;
    createdDate: number;
    modifiedDate: number;
    lastModifiedBy: string;
};

export type JobPostingDetailResponse = {
    key: string;
    positionName: string;
    jobTypeCode: string;
    jobTypeName: string;
    location: string;
    body: string;
    status: ContentStatus;
    openStartDate: number;
    openEndDate: number;
    candidateCount: number;
    createdDate: number;
    modifiedDate: number;
    lastModifiedBy: string;
    version: number;
};

export type JobPostingCreateRequest = {
    positionName: string;
    jobTypeCode: string;
    openStartDate: number;
    openEndDate: number;
    body: string;
    thumbnail: string;
    location: string;
};

export type JobPostingCreateResponse = {
    key: string;
};
