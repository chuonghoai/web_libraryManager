import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../core/models/api-response.model';
import { BorrowDetail, BorrowSummary } from '../models/borrow.model';
import { CreateBorrowDto, ReturnBookDto } from '../dtos/borrow.dto';

@Injectable({ providedIn: 'root' })
export class BorrowRepo {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/borrows`;

    getAllBorrows(): Observable<ApiResponse<BorrowSummary[]>> {
        return of({
            success: true,
            message: 'Lấy danh sách phiếu mượn thành công',
            data: [
                {
                    id: "1",
                    readerId: "1",
                    readerName: 'Nguyễn Văn A',
                    readerCode: 'R001',
                    totalBooks: 2,
                    nearestDueDate: new Date()
                },
                {
                    id: "2",
                    readerId: "2",
                    readerName: 'Trần Văn B',
                    readerCode: 'R002',
                    totalBooks: 1,
                    nearestDueDate: new Date()
                }
            ]
        });
    }

    getById(id: string): Observable<ApiResponse<BorrowDetail>> {
        const today = new Date();
        const dueDate1 = new Date(); dueDate1.setDate(today.getDate() + 14);

        return of({
            success: true,
            message: 'Lấy chi tiết phiếu mượn thành công',
            data: {
                id: id,
                readerId: "1",
                readerName: 'Nguyễn Văn A',
                readerCode: 'R001',
                readerPhone: '0987654321',
                totalBooks: 4,
                nearestDueDate: dueDate1,
                items: [
                    {
                        id: "item_1",
                        bookId: "b1",
                        bookTitle: "Lập trình Angular cơ bản",
                        quantity: 2,
                        borrowDate: today,
                        dueDate: dueDate1,
                        status: 'BORROWING'
                    },
                    {
                        id: "item_2",
                        bookId: "b2",
                        bookTitle: "Lập trình React cơ bản",
                        quantity: 2,
                        borrowDate: today,
                        dueDate: dueDate1,
                        status: 'BORROWING'
                    }
                ]
            }
        });
    }

    getByReaderCode(readerCode: string): Observable<ApiResponse<BorrowDetail>> {
        return of({
            success: true,
            message: 'Tìm thông tin mượn sách thành công',
            data: {
                id: "1",
                readerId: "1",
                readerName: 'Độc giả ' + readerCode,
                readerCode: readerCode,
                readerPhone: '0123456789',
                totalBooks: 5,
                nearestDueDate: new Date(),
                items: [
                    {
                        id: "item_1",
                        bookId: "b1",
                        bookTitle: "Lập trình Angular cơ bản",
                        quantity: 2,
                        borrowDate: new Date(),
                        dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
                        status: 'BORROWING'
                    },
                    {
                        id: "item_2",
                        bookId: "b2",
                        bookTitle: "Thiết kế hệ thống System Design",
                        quantity: 3,
                        borrowDate: new Date(),
                        dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
                        status: 'BORROWING'
                    }
                ]
            }
        });
    }

    /**
     * Borrow books
     */
    borrowBook(readerId: string, dto: CreateBorrowDto): Observable<ApiResponse<BorrowDetail>> {
        // return this.http.post<ApiResponse<BorrowDetail>>(`${this.apiUrl}/${readerId}`, dto);
        const totalQuantity = dto.items.reduce((sum, item) => sum + item.quantity, 0);

        const mockItems = dto.items.map((item, index) => ({
            id: Date.now().toString() + index,
            bookId: item.bookId,
            bookTitle: `Sách mẫu ID: ${item.bookId}`,
            quantity: item.quantity,
            borrowDate: new Date(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
            status: 'BORROWING' as const
        }));

        return of({
            success: true,
            message: `Mượn thành công ${totalQuantity} cuốn sách!`,
            data: {
                id: "1",
                readerId: readerId,
                readerName: 'Độc giả Mới',
                readerCode: 'R_NEW',
                readerPhone: '0987654321',
                totalBooks: totalQuantity,
                nearestDueDate: new Date(new Date().setDate(new Date().getDate() + 14)),
                items: mockItems
            }
        });
    }

    /**
     * Trả sách 
     */
    returnBooks(borrowId: string, dto: ReturnBookDto): Observable<ApiResponse<BorrowDetail | null>> {
        const totalReturned = dto.items.reduce((sum, item) => sum + item.quantity, 0);

        return of({
            success: true,
            message: `Đã trả thành công ${totalReturned} cuốn sách.`,
            data: {
                id: borrowId,
                readerId: "1",
                readerName: 'Nguyễn Văn A',
                readerCode: 'R001',
                readerPhone: '0987654321',
                totalBooks: 0,
                nearestDueDate: new Date(),
                items: []
            }
        });
    }
}