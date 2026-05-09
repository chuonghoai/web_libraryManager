export interface Book {
    id: string;
    title: string;
    author: string;
    publishedYear: number;
}

export interface BookDetail extends Book {
    description: string;
    createdAt: Date;
    updatedAt: Date;
}