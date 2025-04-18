import type { Me } from '~/models/Me';
import type { Nullable } from '~/types';

export const useAuthStore = defineStore(
    'auth',
    () => {
        const firebaseToken = shallowRef<string>('');
        const token = shallowRef<string>('');
        const user = shallowRef<Nullable<Me & { photo?: string }>>(null);

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

        function setUser(newUser: Nullable<Me & { photo?: string }>) {
            user.value = newUser;
        }

        return {
            token,
            firebaseToken,
            user,
            setToken,
            logout,
            setFirebaseToken,
            setUser,
        };
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.cookies(),
            pick: ['token'],
        },
    },
);
