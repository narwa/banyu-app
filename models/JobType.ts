import type { Nullable } from '~/types';

export type JobType = {
    code: string;
    description: string;
    createdDate: number;
    modifiedDate: Nullable<number>;
};

export type JobTypeCreate = {
    code: string;
    description: string;
};
