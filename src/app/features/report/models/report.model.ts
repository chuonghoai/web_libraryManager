/**
 * Sách được mượn nhiều nhất trong tháng
 */
export interface TopBorrowedBook {
    id: string;
    title: string;
    totalBorrowed: number;
}

/**
 * Sách sắp hết trong kho (tồn kho < 5)
 */
export interface LowStockBook {
    id: string;
    title: string;
    stock: number;
}

/**
 * Độc giả có sách đang mượn quá hạn
 * totalOverdueBooks: Tổng số sách đang có status OVERDUE
 */
export interface OverdueReader {
    id: string;
    readerId: string;
    readerName: string;
    readerCode: string;
    totalOverdueBooks: number;
}

/**
 * Main model
 */
export interface ReportModel {
    totalBooksInStock: number;
    totalBooksBorrowed: number;
    totalReaders: number;

    mostBorrowedBooks: TopBorrowedBook[];
    lowStockBooks?: LowStockBook[];
    overdueReaders: OverdueReader[];
}