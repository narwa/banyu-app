import type { UseMutationOptions } from '@tanstack/vue-query';
import type { MemberResponse } from '~/models/Member';
import type { ErrorResponse } from '~/types';
import { MemberServiceImpl } from '~/services/impl/MemberServiceImpl';

export const useMutationMemberDelete = (
    options?: UseMutationOptions<
        MemberResponse,
        ErrorResponse,
        string,
        unknown
    >,
) => {
    const memberService = new MemberServiceImpl();
    return useMutation({
        mutationFn: (code: string) => memberService.deleteMember(toValue(code)),
        ...options,
    });
};
