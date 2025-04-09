import type { UploadStatus } from '../UploadStatus';
import type { Nullable } from '~/types';

export class UploadState<TData = any> {
    id!: string;
    data!: Nullable<TData>;
    file!: Nullable<File>;
    name!: string;
    type!: string;
    size!: number;
    status!: UploadStatus;
    progressCompleted!: number;
    order!: number;

    constructor(values = {}) {
        Object.assign(
            this,
            {
                id: '',
                data: null,
                name: '',
                status: 'pending',
                progressCompleted: 0,
                order: 1,
            },
            values,
        );
    }

    setId(value: string): this {
        this.id = value;
        return this;
    }

    setData(value: Nullable<TData>): this {
        this.data = value;
        return this;
    }

    setFile(value: Nullable<File>): this {
        this.file = value;
        return this;
    }

    setName(value: string): this {
        this.name = value;
        return this;
    }

    setType(value: string): this {
        this.type = value;
        return this;
    }

    setSize(value: number): this {
        this.size = value;
        return this;
    }

    setStatus(value: UploadStatus): this {
        this.status = value;
        return this;
    }

    setProgressCompleted(value: number): this {
        this.progressCompleted = value;
        return this;
    }

    setOrder(value: number): this {
        this.order = value;
        return this;
    }
}
