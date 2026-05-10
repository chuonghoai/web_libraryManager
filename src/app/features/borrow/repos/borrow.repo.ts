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

    /**
     * GET /borrows
     * @returns list BorrowSummary[]
     * Note: 
     *  - totalBooks = Tổng các sách đang mượn (Chỉ tính sách có trạng thái BORROWING và OVERDUE)
     *  - nearestDueDate = Ngày đến hạn trả sách gần nhất (Chỉ tính sách có trạng thái BORROWING và OVERDUE)
     *  - Mỗi sách mượn đều có enum status là 'BORROWING' | 'RETURNED' | 'OVERDUE'
     */
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

    /**
     * GET /borrows/:id
     * @param id 
     * @returns BorrowDetail
     * Note: 
     *  - totalBooks = Tổng các sách đang mượn (Chỉ tính sách có trạng thái BORROWING và OVERDUE)
     *  - nearestDueDate = Ngày đến hạn trả sách gần nhất (Chỉ tính sách có trạng thái BORROWING và OVERDUE)
     */
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

    /**
     * GET /borrows/reader/:readerCode
     * @param readerCode 
     * @returns BorrowDetail
     * Note: 
     *  - totalBooks = Tổng các sách đang mượn (Chỉ tính sách có trạng thái BORROWING và OVERDUE)
     *  - nearestDueDate = Ngày đến hạn trả sách gần nhất (Chỉ tính sách có trạng thái BORROWING và OVERDUE)
     */
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
     * POST /borrows/:readerId/borrow
     * @param readerId
     * @body CreateBorrowDto
     * @returns BorrowDetail
     * Note:
     *  - totalBooks = Tổng các sách đang mượn (Chỉ tính sách có trạng thái BORROWING và OVERDUE)
     *  - nearestDueDate = Ngày đến hạn trả sách gần nhất (Chỉ tính sách có trạng thái BORROWING và OVERDUE)
     *  - dueDate: Hạn chót phải trả, mặc định là 1 tháng sau khi mượn
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
     * POST /borrows/:borrowId/return
     * @param borrowId
     * @body ReturnBookDto
     * @returns BorrowDetail | null
     * Note:
     *  - totalBooks = Tổng các sách đang mượn (Chỉ tính sách có trạng thái BORROWING và OVERDUE)
     *  - nearestDueDate = Ngày đến hạn trả sách gần nhất (Chỉ tính sách có trạng thái BORROWING và OVERDUE)
     *  - Khi trả sách, thì cập nhật item status trong database thành RETURNED, không xóa nó khỏi database
     *  - Nếu trả hết sách thì items là null, nếu chưa thì items là danh sách các sách còn lại
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