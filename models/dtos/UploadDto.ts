import type { BucketType } from '~/types';

export class UploadDto {
    bucketType!: BucketType;
    fileId!: string;

    setBucketType(value: BucketType): this {
        this.bucketType = value;
        return this;
    }

    setFileId(value: string): this {
        this.fileId = value;
        return this;
    }
}
