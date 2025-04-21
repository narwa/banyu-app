import type { UseMutationOptions } from '@tanstack/vue-query';
import type { MemberDetailResponse } from '~/models/Member';
import { useMutation } from '@tanstack/vue-query';
import { MemberServiceImpl } from '~/services/impl/MemberServiceImpl';

export const useMutationGetMemberDetail = (options?: UseMutationOptions<MemberDetailResponse, Error, string>) => {
    const areaService = new MemberServiceImpl();
    return useMutation<MemberDetailResponse, Error, string>({
        mutationFn: (id: string) => areaService.getMemberDetail(id),
        ...options,
    });
};
