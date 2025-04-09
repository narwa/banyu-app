import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class AuthorEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'author',
            version: 'v1',
        });
    }

    public static readonly AUTHOR_LIST = Endpoint.getPath('');
}
