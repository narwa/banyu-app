import type { MemberDto } from '~/models/dtos/MemberDto';
import type { MemberDetailResponse, MemberListResponse, MemberResponse } from '~/models/Member';
import type { MemberPaginationSearchParams } from '~/models/params/MemberPaginationSearchParams';
import type { MemberService } from '~/services/MemberService';
import type { GenericPagination } from '~/types';
import { useNuxtApp } from '#app';
import { MemberEndpoint } from '~/endpoints/MemberEndpoint';

export class MemberServiceImpl implements MemberService {
    async getMemberList(params: MemberPaginationSearchParams): Promise<GenericPagination<MemberListResponse[]>> {
        return await useNuxtApp().$api<GenericPagination<MemberListResponse[]>>(MemberEndpoint.LIST, {
            query: {
                ...params,
                page: params.page - 1,
            },
        });
    }

    async getMemberDetail(id: string): Promise<MemberDetailResponse> {
        return await useNuxtApp().$api<MemberDetailResponse>(MemberEndpoint.DETAIL.replace('[id]', id));
    }

    createMember(data: MemberDto): Promise<MemberResponse> {
        return useNuxtApp().$api<MemberResponse>(
            MemberEndpoint.CREATE,
            {
                method: 'POST',
                body: {
                    ...data,
                },
            },
        );
    }

    updateMember(id: string, data: MemberDto): Promise<MemberResponse> {
        return useNuxtApp().$api<MemberResponse>(
            MemberEndpoint.UPDATE.replace('[id]', id),
            {
                method: 'PUT',
                body: {
                    ...data,
                },
            },
        );
    }

    deleteMember(id: string): Promise<MemberResponse> {
        return useNuxtApp().$api<MemberResponse>(
            MemberEndpoint.DELETE.replace('[id]', id),
            {
                method: 'DELETE',
            },
        );
    }
}
