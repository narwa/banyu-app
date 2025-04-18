import type { Rate } from '../Area';

export class AreaDto {
    code!: string;
    description!: string;
    rates!: Rate[];

    setCode(code: string): this {
        this.code = code;
        return this;
    }

    setDescription(description: string): this {
        this.description = description;
        return this;
    }

    setRates(rates: Rate[]): this {
        this.rates = rates;
        return this;
    }
}
