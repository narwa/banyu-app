import type { UseMutationOptions } from '@tanstack/vue-query';
import type { MeterReadingCalculateDto } from '~/models/dtos/MeterReadingCalculateDto';
import type { MeterReadingResponse } from '~/models/MeterReading';
import type { ErrorResponse } from '~/types';
import { MeterReadingServiceImpl } from '~/services/impl/MeterReadingServiceImpl';

export const useMutationMeterReadingCalculate = (
    options?: UseMutationOptions<
        MeterReadingResponse,
        ErrorResponse,
        MeterReadingCalculateDto,
        unknown
    >,
) => {
    const meterReadingService = new MeterReadingServiceImpl();
    return useMutation({
        mutationFn: (data: MeterReadingCalculateDto) => meterReadingService.calculate(data),
        ...options,
    });
};
