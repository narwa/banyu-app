import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class JobTypeEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'job-type',
            version: 'v1',
        });
    }

    public static readonly JOB_TYPE = Endpoint.getPath('');
    public static readonly JOB_TYPE_PARAM_CODE = Endpoint.getPath('[code]');
}
