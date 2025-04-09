export class JobPostingDto {
    positionName!: string;
    jobTypeCode!: string;
    openStartDate!: number;
    openEndDate!: number;
    body!: string;
    thumbnail!: string;
    location!: string;

    setPositionName(positionName: string): this {
        this.positionName = positionName;
        return this;
    }

    setJobTypeCode(jobTypeCode: string): this {
        this.jobTypeCode = jobTypeCode;
        return this;
    }

    setOpenStartDate(openStartDate: number): this {
        this.openStartDate = openStartDate;
        return this;
    }

    setOpenEndDate(openEndDate: number): this {
        this.openEndDate = openEndDate;
        return this;
    }

    setBody(body: string): this {
        this.body = body;
        return this;
    }

    setThumbnail(thumbnail: string): this {
        this.thumbnail = thumbnail;
        return this;
    }

    setLocation(location: string): this {
        this.location = location;
        return this;
    }
}
