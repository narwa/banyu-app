import type { ContentStatus, Undefined } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class JobPostingPaginationSearchParams extends PaginationSearchParam {
    status: Undefined<ContentStatus[]> = ['ARCHIVED', 'DRAFT', 'PUBLISHED'];
    positionName!: Undefined<string>;

    constructor() {
        super();
    }

    setStatus(status: Undefined<ContentStatus[]>): this {
        this.status = status || ['ARCHIVED', 'DRAFT', 'PUBLISHED'];
        return this;
    }

    setPositionName(positionName: Undefined<string>): this {
        this.positionName = positionName;
        return this;
    }
}
