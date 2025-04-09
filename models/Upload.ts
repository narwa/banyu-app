import type {
    BucketType,
    ContentType,
    MediaType,
} from '~/types';

export type Upload = {
    bucketType: BucketType;
    contentType: ContentType;
    mediaType: MediaType;
    fileName: string;
    mimeType: string;
};

export type UploadResponse = {
    id: string;
    url: string;
};

export type UploadMetadata = {
    fileId: string;
};

export type UploadMetadataResponse = {
    [id: string]: {
        fileName: string;
        fileType: string;
        mimeType: string;
        fileSize: number;
        url: string;
    };
};
