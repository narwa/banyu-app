import type { MemberDto } from '~/models/dtos/MemberDto';
import type { MemberDetailResponse, MemberListResponse, MemberResponse } from '~/models/Member';
import type { MemberPaginationSearchParams } from '~/models/params/MemberPaginationSearchParams';
import type { GenericPagination } from '~/types';

export type MemberService = {
    getMemberList: (params: MemberPaginationSearchParams) => Promise<GenericPagination<MemberListResponse[]>>;
    getMemberDetail: (id: string) => Promise<MemberDetailResponse>;
    createMember: (data: MemberDto) => Promise<MemberResponse>;
    updateMember: (id: string, data: MemberDto) => Promise<MemberResponse>;
    deleteMember: (id: string) => Promise<MemberResponse>;
};
