import type { Nullable } from '~/types';

export type JobPosition = {
    name: string;
    description: string;
    createdDate: number;
    modifiedDate: Nullable<number>;
};

export type JobPositionCreate = {
    name: string;
    description: string;
};
