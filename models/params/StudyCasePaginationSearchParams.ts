import type { ContentStatus, Undefined } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class StudyCasePaginationSearchParams extends PaginationSearchParam {
    status: Undefined<ContentStatus[]> = ['ARCHIVED', 'DRAFT', 'PUBLISHED'];
    title!: Undefined<string>;

    constructor() {
        super();
    }

    setStatus(status: Undefined<ContentStatus[]>): this {
        this.status = status || ['ARCHIVED', 'DRAFT', 'PUBLISHED'];
        return this;
    }

    setTitle(title: Undefined<string>): this {
        this.title = title;
        return this;
    }
}
