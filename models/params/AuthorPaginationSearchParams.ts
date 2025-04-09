import type { Undefined } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class AuthorPaginationSearchParams extends PaginationSearchParam {
    fullName!: Undefined<string>;
    username!: Undefined<string>;

    constructor() {
        super();
        this.size = undefined as unknown as number;
    }

    setFullName(value: Undefined<string>): this {
        this.fullName = value;
        return this;
    }

    setUsername(value: Undefined<string>): this {
        this.username = value;
        return this;
    }
}
