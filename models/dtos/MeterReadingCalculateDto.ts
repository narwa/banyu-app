export class MeterReadingCalculateDto {
    areaCode!: string;
    month!: number;
    year!: number;

    setAreaCode(areaCode: string): this {
        this.areaCode = areaCode;
        return this;
    }

    setMonth(month: number): this {
        this.month = month;
        return this;
    }

    setYear(year: number): this {
        this.year = year;
        return this;
    }
}
