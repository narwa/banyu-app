import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class PingEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
        });
    }

    public static readonly PING = Endpoint.getPath('ping');
}
