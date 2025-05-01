import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class MeterReadingEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'meter-reading',
            version: 'v1',
        });
    }

    public static readonly LIST = Endpoint.getPath('');
    public static readonly DETAIL = Endpoint.getPath('[id]');
    public static readonly CREATE = Endpoint.getPath('');
    public static readonly UPDATE = Endpoint.getPath('[id]');
    public static readonly CALCULATE = Endpoint.getPath('/calculate');
    public static readonly CALCULATE_BY_ID = Endpoint.getPath('[id]/calculate');
}
