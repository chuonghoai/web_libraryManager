export interface BorrowItem {
    id: string;
    bookId: string;
    bookTitle: string;
    quantity: number;
    borrowDate: Date;
    dueDate: Date;
    status: 'BORROWING' | 'RETURNED' | 'OVERDUE';
}

export interface BorrowSummary {
    id: string;
    readerId: string;
    readerName: string;
    readerCode: string;
    totalBooks: number;
    nearestDueDate: Date;
}

export interface BorrowDetail extends BorrowSummary {
    readerPhone: string;
    items: BorrowItem[];
}