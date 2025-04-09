import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class JobPostingEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'job-posting',
            version: 'v1',
        });
    }

    public static readonly JOB_POSTING = Endpoint.getPath('');
    public static readonly JOB_POSTING_PARAM_KEY = Endpoint.getPath('[key]');
    public static readonly JOB_POSTING_PARAM_KEY_STATUS = Endpoint.getPath('[key]/status');
}
