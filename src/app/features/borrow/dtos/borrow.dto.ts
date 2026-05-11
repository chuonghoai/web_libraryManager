export interface CreateBorrowItemDto {
    bookId: string;
    quantity: number;
}

export interface BorrowItemRequestDto extends CreateBorrowItemDto {
    borrowItemId: string;
}

export interface CreateBorrowDto {
    items: CreateBorrowItemDto[];
}

export interface ReturnBookDto {
    items: BorrowItemRequestDto[];
}