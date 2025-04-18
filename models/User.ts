import type { Me } from './Me';
import type { UserType } from '~/types';

export type UserListResponse = Omit<Me, 'userType' | 'userTypeId' | 'lastUpdateBy'> & {
    id: string;
    updatedAt: number;
    type: UserType;
    areas: string[];
};
export type UserDetailResponse = UserListResponse;
export type UserResponse = UserListResponse;
