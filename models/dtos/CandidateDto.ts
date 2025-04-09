import type { ApplicationStatus } from '~/types';

export class CandidateStatusDto {
    status!: ApplicationStatus;
    interviewerNotes!: string;
    rejectionReason!: string;
    version!: number;

    setStatus(status: ApplicationStatus): this {
        this.status = status;
        return this;
    }

    setInterviewerNotes(interviewerNotes: string): this {
        this.interviewerNotes = interviewerNotes;
        return this;
    }

    setRejectionReason(rejectionReason: string): this {
        this.rejectionReason = rejectionReason;
        return this;
    }

    setVersion(version: number): this {
        this.version = version;
        return this;
    }
}
