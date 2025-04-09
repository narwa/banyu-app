import type { ContentStatus, GeneralSeo } from '~/types';

export type StudyCase = {
    id: string;
    portfolioKey: string;
    title: string;
    clientImage: string;
    thumbnail: string;
    bodySummary: string;
    bodyDetail: string;
    projectTypes: string[];
    status: ContentStatus;
    lastModifiedBy: string;
    createdDate: number;
    modifiedDate: number;
};

export type StudyCaseCreateResponse = {
    id: string;
    portfolioKey: string;
};

export type StudyCaseDetail = {
    publishDate: number;
    archivedDate: number;
    tags: string[];
} & Pick<StudyCase, 'id' | 'portfolioKey' | 'title' | 'clientImage' | 'thumbnail' | 'bodySummary' | 'bodyDetail' | 'status' | 'lastModifiedBy' | 'createdDate' | 'modifiedDate'> & GeneralSeo;

export type StudyCaseState = {
    clientImage: string;
    title: string;
    thumbnail: string;
    bodySummary: string;
    bodyDetail: string;
    projectTypes: string[];
    clientImageFile: {
        file: File | null;
        preview: string;
    };
    thumbnailImageFile: {
        file: File | null;
        preview: string;
    };
    isLoading: boolean;
    modifiedDate: number;
};
