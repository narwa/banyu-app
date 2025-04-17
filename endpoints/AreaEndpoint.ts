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
    public static readonly AREA_DETAIL = (code: string) => Endpoint.getPath(`/${code}`);
}
