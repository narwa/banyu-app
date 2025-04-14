import type { Undefined } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class UserPaginationSearchParams extends PaginationSearchParam {
    fullName!: Undefined<string>;

    constructor() {
        super();
    }

    setFullName(value: Undefined<string>): this {
        this.fullName = value;
        return this;
    }
}
