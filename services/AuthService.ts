import type { LoginResponse } from '~/types';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';
import { useAPI } from '~/composables/useAPI';
import { AuthEndpoint } from '~/endpoints/AuthEndpoint';

export const authService = () => {
    const loginFirebase = () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const loginAuth = (token: string) => {
        return useAPI<LoginResponse>(
            AuthEndpoint.LOGIN,
            {
                method: 'POST',
                headers: {
                    firebaseToken: `Bearer ${token}`,
                },
            },

        );
    };

    return {
        loginAuth,
        loginFirebase,
    };
};
