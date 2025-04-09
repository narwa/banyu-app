import type { UserType } from '~/types';

export type User = {
    username: string;
    fullName: string;
    userType: UserType;
    userTypeId: string;
    lastLogin: number;
    createdAt: number;
    lastUpdateBy: string;
    photoProfile: string;
};
