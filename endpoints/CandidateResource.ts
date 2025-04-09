import {
    Endpoint,
    ENDPOINT_PATH,
} from './Endpoint';

export class CandidateResourceEndpoint {
    static {
        Endpoint.setEndpoint({
            baseUrl: ENDPOINT_PATH,
            module: 'candidate',
            version: 'v1',
        });
    }

    public static readonly CANDIDATE_RESOURCE = Endpoint.getPath('[id]');
}
