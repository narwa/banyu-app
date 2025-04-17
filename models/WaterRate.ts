export type WaterRateListResponse = {
    id: string;
    areaCode: string;
    areaDescription: string;
    tierStart: number;
    tierEnd: number;
    ratePerUnit: number;
    effectiveFromDate: number;
    effectiveToDate: number;
};
