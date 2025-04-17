export class GeneralConfigDto {
    code!: string;
    dataType!: string;
    value!: string;

    setCode(code: string): this {
        this.code = code;
        return this;
    }

    setDataType(dataType: string): this {
        this.dataType = dataType;
        return this;
    }

    setValue(value: string): this {
        this.value = value;
        return this;
    }
}
