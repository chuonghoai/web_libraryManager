import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../core/models/api-response.model';
import { BorrowDetail, BorrowSummary } from '../models/borrow.model';
import { CreateBorrowDto, ReturnBookDto } from '../dtos/borrow.dto';

@Injectable({ providedIn: 'root' })
export class BorrowRepo {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/borrows`;

    /**
     * Fix:
     *  - Item nào đã trả thì không tính vào response
     * GET /borrows
     */
    getAllBorrows(): Observable<ApiResponse<BorrowSummary[]>> {
        return this.http.get<ApiResponse<BorrowSummary[]>>(this.apiUrl);
    }

    /**
     * GET /borrows/:id
     */
    getById(id: string): Observable<ApiResponse<BorrowDetail>> {
        return this.http.get<ApiResponse<BorrowDetail>>(`${this.apiUrl}/${id}`);
    }

    /**
     * Fix:
     *  - Item nào đã trả thì không tính vào response
     * GET /borrows/reader/:readerCode
     */
    getByReaderCode(readerCode: string): Observable<ApiResponse<BorrowDetail>> {
        return this.http.get<ApiResponse<BorrowDetail>>(
            `${this.apiUrl}/reader/${readerCode}`
        );
    }

    /**
     * POST /borrows/:readerId/borrow
     */
    borrowBook(
        readerId: string,
        dto: CreateBorrowDto
    ): Observable<ApiResponse<BorrowDetail>> {
        return this.http.post<ApiResponse<BorrowDetail>>(
            `${this.apiUrl}/${readerId}/borrow`,
            dto
        );
    }

    /**
     * Fix:
     *  - Ví dụ mượn 2 cuốn, trả 1 cuốn, backend báo lỗi: "Số lượng trả (1) vượt quá số lượng mượn (0)"
     *  - Cụ thể: Nếu trong database borrow_item có 2 dòng record mượn cùng 1 loại sách
     *      thì nếu trả hết số lượng của 1 dòng record, thì ko trả được dòng record còn lại
     *  - Cách sửa: ReturnBookDto thêm field borrowItemId: string để xác định dòng record cần trả
     * POST /borrows/:borrowId/return
     */
    returnBooks(
        borrowId: string,
        dto: ReturnBookDto
    ): Observable<ApiResponse<BorrowDetail | null>> {
        return this.http.post<ApiResponse<BorrowDetail | null>>(
            `${this.apiUrl}/${borrowId}/return`,
            dto
        );
    }
}