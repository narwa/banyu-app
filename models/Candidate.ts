import type { ApplicationStatus } from '~/types';

export type CandidateListResponse = {
    id: string;
    candidateId: string;
    jobPostingKey: string;
    positionName: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    gender: string;
    status: ApplicationStatus;
    createdDate: number;
    modifiedDate: number;
    modifiedBy: string;
};

export type CandidateDetailResponse = {
    id: string;
    candidateId: string;
    jobPostingKey: string;
    positionName: string;
    email: string;
    fullName: string;
    status: ApplicationStatus;
    attachmentCv: string;
    interviewerNotes: string;
    rejectionReason: string;
    lastStatusUpdate: number;
    createdDate: number;
    modifiedBy: string;
    version: number;
    activities: CandidateActivities[];
    expectedSalary: number;
};

export type CandidateActivities = {
    activityDateTime: number;
    status: ApplicationStatus;
    actor: string;
    remark: string;
};

export type CandidateApplicationStatusResponse = {
    id: string;
    status: ApplicationStatus;
    interviewerNotes: string;
    rejectionReason: string;
    lastStatusUpdate: number;
    version: number;
};

export type CandidateStatusApplicationUpdateStatusRequest = {
    status: ApplicationStatus;
    interviewerNotes: string;
    rejectionReason: string;
    version: number;
};

export type CandidateResourceResponse = {
    candidateSecureId: string;
    userSecureId: string;
    username: string;
    fullName: string;
    lastLogin: number;
    createdDate: number;
    modifiedDate: number;
    photoProfile: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    birthDate: string;
    gender: string;
    lastEducation: string;
    lastEducationMayor: string;
    country: string;
    region: string;
    city: string;
    address: string;
    reference: string;
    version: number;
};
