export interface BorrowItemRequestDto {
    bookId: string;
    quantity: number;
}

export interface CreateBorrowDto {
    items: BorrowItemRequestDto[];
}

export interface ReturnBookDto {
    items: BorrowItemRequestDto[];
}