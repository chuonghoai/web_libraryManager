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