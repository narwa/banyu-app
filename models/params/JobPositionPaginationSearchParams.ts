import type { Undefined } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class JobPositionPaginationSearchParams extends PaginationSearchParam {
    name!: Undefined<string>;
    description!: Undefined<string>;

    setCode(name: Undefined<string>): this {
        this.name = name;
        return this;
    }

    setDescription(description: Undefined<string>): this {
        this.description = description;
        return this;
    }
}
