export interface CreateBorrowDto {
    readerId: string;
    bookIds: string[];
}

export interface ReturnBookItemDto {
    bookId: string;
    quantity: number;
}

export interface ReturnBookDto {
    items: ReturnBookItemDto[];
}