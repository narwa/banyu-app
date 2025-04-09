import type { UserService } from '../UserService';
import type { User } from '~/models/User';
import { useNuxtApp } from '#app';
import { AuthEndpoint } from '~/endpoints/AuthEndpoint';

export class UserServiceImpl implements UserService {
    getDetailProfile(): Promise<User> {
        return useNuxtApp().$api<User>(AuthEndpoint.GET_PROFILE);
    }
}
