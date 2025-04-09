import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class BlogEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'blog',
            version: 'v1',
        });
    }

    public static readonly BLOG_LIST = Endpoint.getPath('');
    public static readonly BLOG_DETAIL = Endpoint.getPath('[key]');
    public static readonly BLOG_STATUS = Endpoint.getPath('[id]/status');
    public static readonly BLOG_CREATE = Endpoint.getPath('');
    public static readonly BLOG_UPDATE = Endpoint.getPath('[id]');
}
