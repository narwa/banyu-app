import type { WaterRateListResponse } from './WaterRate';

export type Rate = Pick<WaterRateListResponse, 'tierStart' | 'tierEnd' | 'ratePerUnit'>;
export type AreaListResponse = {
    code: string;
    description: string;
    rates: Rate[];
};
export type AreaDetailResponse = AreaListResponse;
export type AreaResponse = AreaListResponse;
