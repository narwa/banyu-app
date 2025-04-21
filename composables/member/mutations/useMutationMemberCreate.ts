import type { UseMutationOptions } from '@tanstack/vue-query';
import type { MemberDto } from '~/models/dtos/MemberDto';
import type { MemberListResponse } from '~/models/Member';
import { useMutation } from '@tanstack/vue-query';
import { MemberServiceImpl } from '~/services/impl/MemberServiceImpl';

export const useMutationMemberCreate = (options?: UseMutationOptions<MemberListResponse, Error, MemberDto>) => {
    const memberService = new MemberServiceImpl();
    return useMutation<MemberListResponse, Error, MemberDto>({
        mutationFn: request => memberService.createMember(request),
        ...options,
    });
};
