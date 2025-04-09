import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class CandidateEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'candidate-application',
            version: 'v1',
        });
    }

    public static readonly CANDIDATE_APPLICATION = Endpoint.getPath('');
    public static readonly CANDIDATE_APPLICATION_DETAIL = Endpoint.getPath('[id]');
    public static readonly CANDIDATE_APPLICATION_STATUS = Endpoint.getPath('[id]/status');
}
