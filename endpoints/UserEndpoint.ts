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

    public static readonly USER_LIST = Endpoint.getPath('');
    public static readonly USER_DETAIL = Endpoint.getPath('[key]');
    public static readonly USER_CREATE = Endpoint.getPath('');
    public static readonly USER_UPDATE = Endpoint.getPath('[id]');
}
