import type { UseMutationOptions } from '@tanstack/vue-query';
import type { MeterReadingDto } from '~/models/dtos/MeterReadingDto';
import type { MeterReadingResponse } from '~/models/MeterReading';
import type { ErrorResponse } from '~/types';
import { MeterReadingServiceImpl } from '~/services/impl/MeterReadingServiceImpl';

export const useMutationMeterReadingUpdate = (
    code: MaybeRef<string>,
    options?: UseMutationOptions<
        MeterReadingResponse,
        ErrorResponse,
        MeterReadingDto,
        unknown
    >,
) => {
    const meterReadingService = new MeterReadingServiceImpl();
    return useMutation({
        mutationFn: (data: MeterReadingDto) => meterReadingService.updateMeterReading(toValue(code), data),
        ...options,
    });
};
