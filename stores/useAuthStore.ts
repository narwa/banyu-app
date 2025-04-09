import type { User } from '~/models/User';
import type { Nullable } from '~/types';

export const useAuthStore = defineStore(
    'auth',
    () => {
        const firebaseToken = shallowRef<string>('');
        const token = shallowRef<string>('');
        const user = shallowRef<Nullable<User & { photo?: string }>>(null);

        function setToken(newToken: string) {
            token.value = newToken ?? '';
        }
        function setFirebaseToken(newToken: string) {
            firebaseToken.value = newToken ?? '';
        }

        function logout() {
            setFirebaseToken('');
            setToken('');
            navigateTo({ name: 'login' });
            setUser(null);
        }

        function setUser(newUser: Nullable<User & { photo?: string }>) {
            user.value = newUser;
        }

        return {
            token,
            setToken,
            logout,
            firebaseToken,
            setFirebaseToken,
            setUser,
            user,
        };
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.cookies(),
            pick: ['token'],
        },
    },
);
