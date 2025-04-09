import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class FileEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'file',
            version: 'v1',
        });
    }

    public static readonly METADATA = Endpoint.getPath('metadata');
}
