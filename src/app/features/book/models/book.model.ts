export interface Book {
    id: string;
    title: string;
    author: string;
    publishedYear: number;
}

export interface BookDetail extends Book {
    description: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}