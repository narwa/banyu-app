import type { UseMutationOptions } from '@tanstack/vue-query';
import type { MeterReadingDetailResponse } from '~/models/MeterReading';
import type { ErrorResponse } from '~/types';
import { MeterReadingServiceImpl } from '~/services/impl/MeterReadingServiceImpl';

export const useMutationGetMeterReadingDetail = (
    options?: UseMutationOptions<
        MeterReadingDetailResponse,
        ErrorResponse,
        {
            id: string;
        },
        unknown
    >,
) => {
    const meterReadingService = new MeterReadingServiceImpl();
    return useMutation({
        mutationFn: ({ id }) => meterReadingService.getMeterReadingDetail(id),
        ...options,
    });
};
