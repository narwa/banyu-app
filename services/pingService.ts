import { PingEndpoint } from '~/endpoints/PingEndpoint';

export const pingService = () => {
    return useAPI<string>(
        PingEndpoint.PING,
        {
            method: 'GET',
        },
    );
};
