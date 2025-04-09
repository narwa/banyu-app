import type { ContentStatus } from '~/types';

export class StudyCaseDto {
    id!: string;
    portfolioKey!: string;
    title!: string;
    clientImage!: string;
    thumbnail!: string;
    bodySummary!: string;
    status!: ContentStatus;
    lastModifiedBy!: string;
    createdDate!: number;
    modifiedDate!: number;
    bodyDetail!: string;
    projectTypes!: string[];

    setId(id: string): this {
        this.id = id;
        return this;
    }

    setPortofolioKey(portfolioKey: string): this {
        this.portfolioKey = portfolioKey;
        return this;
    }

    setTitle(title: string): this {
        this.title = title;
        return this;
    }

    setClientImage(clientImage: string): this {
        this.clientImage = clientImage;
        return this;
    }

    setThumbnail(thumbnail: string): this {
        this.thumbnail = thumbnail;
        return this;
    }

    setBodySummary(bodySummary: string): this {
        this.bodySummary = bodySummary;
        return this;
    }

    setStatus(status: ContentStatus): this {
        this.status = status;
        return this;
    }

    setLastModifiedBy(lastModifiedBy: string): this {
        this.lastModifiedBy = lastModifiedBy;
        return this;
    }

    setCreatedDate(createdDate: number): this {
        this.createdDate = createdDate;
        return this;
    }

    setModifiedDate(modifiedDate: number): this {
        this.modifiedDate = modifiedDate;
        return this;
    }

    setBodyDetail(bodyDetail: string): this {
        this.bodyDetail = bodyDetail;
        return this;
    }

    setProjectTypes(projectTypes: string[]): this {
        this.projectTypes = projectTypes;
        return this;
    }
}
