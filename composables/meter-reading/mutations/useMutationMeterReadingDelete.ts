import type { UseMutationOptions } from '@tanstack/vue-query';
import type { MeterReadingResponse } from '~/models/MeterReading';
import type { ErrorResponse } from '~/types';
import { MeterReadingServiceImpl } from '~/services/impl/MeterReadingServiceImpl';

export const useMutationMeterReadingDelete = (
    options?: UseMutationOptions<
        MeterReadingResponse,
        ErrorResponse,
        string,
        unknown
    >,
) => {
    const meterReadingService = new MeterReadingServiceImpl();
    return useMutation({
        mutationFn: (code: string) => meterReadingService.deleteMeterReading(toValue(code)),
        ...options,
    });
};
