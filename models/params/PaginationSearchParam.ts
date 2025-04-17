import type { SortDirection } from '~/components/base/VTable';
import type { Undefined } from '~/types';

export class PaginationSearchParam {
    sort!: Undefined<string>;
    direction!: Undefined<SortDirection>;
    page!: number;
    size!: number;

    constructor() {
        Object.assign(this, {
            page: 1,
            size: 10,
            limit: 10,
        });
    }

    setSortBy(value: Undefined<string>): this {
        this.sort = value;
        return this;
    }

    setDirection(value: Undefined<SortDirection>): this {
        this.direction = value;
        return this;
    }

    setPage(value: number): this {
        this.page = value;
        return this;
    }

    setFirstPage(): this {
        this.page = 1;
        return this;
    }

    setSize(size: number): this {
        this.size = size;
        return this;
    }
}
