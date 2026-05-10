import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BorrowRepo } from '../repos/borrow.repo';
import { ApiResponse } from '../../../core/models/api-response.model';
import { BorrowDetail, BorrowSummary } from '../models/borrow.model';
import { CreateBorrowDto, ReturnBookDto } from '../dtos/borrow.dto';

@Injectable({ providedIn: 'root' })
export class BorrowService {
    private borrowRepo = inject(BorrowRepo);

    /**
     * Fetch danh sách phiếu mượn
     */
    fetchBorrows(): Observable<ApiResponse<BorrowSummary[]>> {
        return this.borrowRepo.getAllBorrows();
    }

    /**
     * Get chi tiết phiếu mượn theo ID
     */
    getBorrowDetail(id: string): Observable<ApiResponse<BorrowDetail>> {
        return this.borrowRepo.getById(id);
    }

    /**
     * Tìm phiếu mượn theo mã độc giả
     */
    findBorrowByReaderCode(readerCode: string): Observable<ApiResponse<BorrowDetail>> {
        return this.borrowRepo.getByReaderCode(readerCode);
    }

    /**
     * Mượn sách
     */
    borrowBook(dto: CreateBorrowDto): Observable<ApiResponse<BorrowDetail>> {
        return this.borrowRepo.borrowBook(dto);
    }

    /**
     * Trả sách
     */
    returnBooks(borrowId: string, dto: ReturnBookDto): Observable<ApiResponse<BorrowDetail | null>> {
        return this.borrowRepo.returnBooks(borrowId, dto);
    }
}