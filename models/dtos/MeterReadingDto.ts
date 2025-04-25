export class MeterReadingDto {
    meterNumber!: string;
    readingDate!: number;
    previousReading!: number;
    currentReading!: number;
    notes!: string;
    version!: number;

    setMeterNumber(meterNumber: string): this {
        this.meterNumber = meterNumber;
        return this;
    }

    setReadingDate(readingDate: number): this {
        this.readingDate = readingDate;
        return this;
    }

    setPreviousReading(previousReading: number): this {
        this.previousReading = previousReading;
        return this;
    }

    setCurrentReading(currentReading: number): this {
        this.currentReading = currentReading;
        return this;
    }

    setNotes(notes: string): this {
        this.notes = notes;
        return this;
    }

    setVersion(version: number): this {
        this.version = version;
        return this;
    }
}
