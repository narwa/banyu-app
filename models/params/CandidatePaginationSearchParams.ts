import type { ApplicationStatus, Undefined } from '~/types';
import { APPLICATION_STATUS } from '~/constants';
import { PaginationSearchParam } from './PaginationSearchParam';

export class CandidatePaginationSearchParams extends PaginationSearchParam {
    candidateFullName!: Undefined<string>;
    jobPostingKey!: Undefined<string>;
    status: Undefined<ApplicationStatus[]>; ;

    constructor() {
        super();
        Object.assign(
            this,
            {
                status: [
                    APPLICATION_STATUS.SUBMITTED,
                    APPLICATION_STATUS.REVIEWED,
                    APPLICATION_STATUS.REJECTED,
                    APPLICATION_STATUS.TECHNICAL_TEST,
                    APPLICATION_STATUS.INTERVIEWING,
                    APPLICATION_STATUS.OFFERED,
                    APPLICATION_STATUS.ACCEPTED,
                ],
            },
        );
    }

    setCandidateFullName(candidateFullName: Undefined<string>): this {
        this.candidateFullName = candidateFullName;
        return this;
    }

    setJobPostingKey(jobPostingKey: Undefined<string>): this {
        this.jobPostingKey = jobPostingKey;
        return this;
    }

    setStatus(status: Undefined<ApplicationStatus[]>): this {
        this.status = status;
        return this;
    }
}
