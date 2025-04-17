import type { WaterRateListResponse } from './WaterRate';

export type AreaListResponse = {
    code: string;
    description: string;
    rates: Pick<WaterRateListResponse, 'tierStart' | 'tierEnd' | 'ratePerUnit'>[];
};
