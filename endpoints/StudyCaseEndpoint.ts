import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class StudyCaseEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'portfolio',
            version: 'v1',
        });
    }

    public static readonly STUDY_CASE = Endpoint.getPath('');
    public static readonly STUDY_CASE_DETAIL = Endpoint.getPath('[portfolioKey]');
    public static readonly STUDY_CASE_STATUS = Endpoint.getPath('[id]/status');
    public static readonly STUDY_CASE_UPDATE = Endpoint.getPath('[id]');
}
