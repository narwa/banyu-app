import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class AreaEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'area',
            version: 'v1',
        });
    }

    public static readonly AREA_LIST = Endpoint.getPath('');
    public static readonly AREA_CREATE = Endpoint.getPath('');
    // public static readonly AREA_DETAIL = (code: string) => Endpoint.getPath(`${code}`);
    public static readonly AREA_DETAIL = Endpoint.getPath('[key]');
    public static readonly AREA_UPDATE = Endpoint.getPath('[key]');
    public static readonly AREA_DELETE = Endpoint.getPath('[key]');
    // public static readonly AREA_UPDATE = (code: string) => Endpoint.getPath(`${code}`);
}
