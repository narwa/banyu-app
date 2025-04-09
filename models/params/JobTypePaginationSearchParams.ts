import type { Undefined } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class JobTypePaginationSearchParams extends PaginationSearchParam {
    code!: Undefined<string>;
    description!: Undefined<string>;

    setCode(code: Undefined<string>): this {
        this.code = code;
        return this;
    }

    setDescription(description: Undefined<string>): this {
        this.description = description;
        return this;
    }
}
