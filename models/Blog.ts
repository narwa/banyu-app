export type Blog = {
    title: string;
    slug: string;
    thumbnail: string;
    body: string;
    authorID: string;
    tags: string[];
};

export type BlogList = {
    id: string;
    blogKey: string;
    title: string;
    slug: string;
    thumbnail: string;
    status: string;
    publishDate: number;
    authorId: string;
    authorName: string;
    authorThumbnail: string;
    modifiedDate: number;
};

export type BlogDetail = {
    id: string;
    blogKey: string;
    title: string;
    slug: string;
    thumbnail: string;
    body: string;
    authorId: string;
    authorName: string;
    authorThumbnail: string;
    contentId: string;
    status: string;
    readingTimeMin: number;
    createDate: number;
    modifiedDate: number;
    publishDate: number;
    archiveDate: number;
    tags: string[];
    seo: {
        metaTitle: string;
        metaDescription: string;
        metaKeyword: string;
        ogTitle: string;
        ogDescription: string;
        ogImage: string;
    };
};

export type BlogResponse = {
    id: string;
    blogKey: string;
};
