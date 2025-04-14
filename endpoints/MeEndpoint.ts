import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class MeEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'auth',
            version: 'v1',
        });
    }

    public static readonly GET_PROFILE = Endpoint.getPath('me');
}
