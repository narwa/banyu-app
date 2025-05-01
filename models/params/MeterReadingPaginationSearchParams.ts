import type { Undefined, WaterReadingStatus } from '~/types';
import { PaginationSearchParam } from './PaginationSearchParam';

export class MeterReadingPaginationSearchParams extends PaginationSearchParam {
    areaCode!: Undefined<string[]>;
    memberId!: Undefined<string>;
    month!: Undefined<number>;
    year!: Undefined<number>;
    dateStart!: Undefined<number>;
    dateEnd!: Undefined<number>;
    status!: Undefined<WaterReadingStatus>;

    constructor() {
        super();
    }

    setAreaCode(value: Undefined<string[]>): this {
        this.areaCode = value;
        return this;
    }

    setMemberId(value: Undefined<string>): this {
        this.memberId = value;
        return this;
    }

    setMonth(value: Undefined<number>): this {
        this.month = value;
        return this;
    }

    setYear(value: Undefined<number>): this {
        this.year = value;
        return this;
    }

    setDateStart(value: Undefined<number>): this {
        this.dateStart = value;
        return this;
    }

    setDateEnd(value: Undefined<number>): this {
        this.dateEnd = value;
        return this;
    }

    setStatus(value: Undefined<WaterReadingStatus>): this {
        this.status = value;
        return this;
    }
}
