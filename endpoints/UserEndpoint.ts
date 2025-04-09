import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class UserEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'user',
            version: 'v1',
        });
    }

    public static readonly UPDATE_PROFILE = Endpoint.getPath('[id]/profile');
}
