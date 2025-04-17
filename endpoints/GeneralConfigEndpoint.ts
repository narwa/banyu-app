import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class GeneralConfigEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'general-config',
            version: 'v1',
        });
    }

    public static readonly LIST = Endpoint.getPath('');
    public static readonly DETAIL = Endpoint.getPath('[code]');
    public static readonly CREATE = Endpoint.getPath('');
    public static readonly UPDATE = Endpoint.getPath('[code]');
    public static readonly DELETE = Endpoint.getPath('[code]');
}
