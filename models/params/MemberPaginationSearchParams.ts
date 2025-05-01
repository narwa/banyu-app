import type { Undefined } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class MemberPaginationSearchParams extends PaginationSearchParam {
    fullName!: Undefined<string>;
    areaCode!: Undefined<string>;

    constructor() {
        super();
    }

    setFullname(value: Undefined<string>): this {
        this.fullName = value;
        return this;
    }

    setAreaCode(value: Undefined<string>): this {
        this.areaCode = value;
        return this;
    }
}
