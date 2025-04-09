import type { Undefined } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class BlogPaginationSearchParams extends PaginationSearchParam {
    authorId!: Undefined<string>;
    status!: Undefined<string[]>;
    title!: Undefined<string>;

    constructor() {
        super();
    }

    setAuthorId(value: Undefined<string>): this {
        this.authorId = value;
        return this;
    }

    setStatus(value: Undefined<string[]>): this {
        this.status = value;
        return this;
    }

    setTitle(value: Undefined<string>): this {
        this.title = value;
        return this;
    }
}
