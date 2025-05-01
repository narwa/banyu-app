import type { Undefined } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class AreaPaginationSearchParams extends PaginationSearchParam {
    code!: Undefined<string>;

    constructor() {
        super();
    }

    setCode(value: Undefined<string>): this {
        this.code = value;
        return this;
    }
}
