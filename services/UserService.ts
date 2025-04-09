import type { User } from '~/models/User';

export type UserService = {
    getDetailProfile: () => Promise<User>;
};
