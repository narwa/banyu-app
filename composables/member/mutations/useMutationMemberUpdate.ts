import type { UseMutationOptions } from '@tanstack/vue-query';
import type { MemberDto } from '~/models/dtos/MemberDto';
import type { MemberResponse } from '~/models/Member';
import type { ErrorResponse } from '~/types';

import { useMutation } from '@tanstack/vue-query';
import { MemberServiceImpl } from '~/services/impl/MemberServiceImpl';

export const useMutationMemberUpdate = (
    code: MaybeRef<string>,
    options?: UseMutationOptions<
        MemberResponse,
        ErrorResponse,
        MemberDto,
        unknown
    >,
) => {
    const memberService = new MemberServiceImpl();
    return useMutation({
        mutationFn: (data: MemberDto) => memberService.updateMember(toValue(code), data),
        ...options,
    });
};
