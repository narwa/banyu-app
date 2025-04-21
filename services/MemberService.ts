import type { MemberDto } from '~/models/dtos/MemberDto';
import type { MemberDetailResponse, MemberListResponse, MemberResponse } from '~/models/Member';
import type { PaginationSearchParam } from '~/models/params/PaginationSearchParam';
import type { GenericPagination } from '~/types';

export type MemberService = {
    getMemberList: (params: PaginationSearchParam) => Promise<GenericPagination<MemberListResponse[]>>;
    getMemberDetail: (id: string) => Promise<MemberDetailResponse>;
    createMember: (data: MemberDto) => Promise<MemberResponse>;
    updateMember: (id: string, data: MemberDto) => Promise<MemberResponse>;
    deleteMember: (id: string) => Promise<MemberResponse>;
};
