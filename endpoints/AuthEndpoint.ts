import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class AuthEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'auth',
            version: 'v1',
        });
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'auth',
            version: 'v1',
        });
    }

    public static readonly LOGIN = Endpoint.getPath('login/firebase');
    public static readonly GET_PROFILE = Endpoint.getPath('me');
}
