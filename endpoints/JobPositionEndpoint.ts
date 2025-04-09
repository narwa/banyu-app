import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class JobPositionEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'job-position',
            version: 'v1',
        });
    }

    public static readonly JOB_POSITION = Endpoint.getPath('');
    public static readonly JOB_POSITION_PARAM_NAME = Endpoint.getPath('[name]');
}
