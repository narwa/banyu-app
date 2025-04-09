export class BlogDto {
    title!: string;
    slug!: string;
    thumbnail!: string;
    body!: string;
    authorId!: string;
    tags!: string[];
    publishDate?: number | Date | null;

    setTitle(value: string): this {
        this.title = value;
        return this;
    }

    setSlug(value: string): this {
        this.slug = value;
        return this;
    }

    setThumbnail(value: string): this {
        this.thumbnail = value;
        return this;
    }

    setBody(value: string): this {
        this.body = value;
        return this;
    }

    setAuthorId(value: string): this {
        this.authorId = value;
        return this;
    }

    setTags(value: string[]): this {
        this.tags = value;
        return this;
    }

    setPublishDate(value: number | Date | null): this {
        this.publishDate = value;
        return this;
    }
}
