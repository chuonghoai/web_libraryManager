import { Injectable, inject, signal } from '@angular/core';
import { BorrowService } from '../../features/borrow/services/borrow.service';
import { BorrowSummary, BorrowDetail } from '../../features/borrow/models/borrow.model';

@Injectable()
export class BorrowStore {
    private borrowService = inject(BorrowService);

    // Data state
    readonly borrows = signal<BorrowSummary[]>([]);
    readonly isLoading = signal<boolean>(false);
    readonly errorMessage = signal<string | null>(null);

    readonly selectedBorrowId = signal<string | null>(null);
    readonly selectedBorrowDetail = signal<BorrowDetail | null>(null);
    readonly isDetailLoading = signal<boolean>(false);

    /**
     * Load tất cả phiếu mượn
     */
    loadBorrows(): void {
        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.borrowService.fetchBorrows().subscribe({
            next: (response) => {
                if (response.success) {
                    this.borrows.set(response.data);
                } else {
                    this.errorMessage.set(response.message);
                }
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Lỗi kết nối đến máy chủ.');
                this.isLoading.set(false);
            }
        });
    }

    /**
     * Xem chi tiết phiếu mượn
     */
    selectBorrow(id: string): void {
        if (this.selectedBorrowId() === id) return;

        this.selectedBorrowId.set(id);
        this.selectedBorrowDetail.set(null);
        this.isDetailLoading.set(true);

        this.borrowService.getBorrowDetail(id).subscribe({
            next: (response) => {
                if (response.success) this.selectedBorrowDetail.set(response.data);
                this.isDetailLoading.set(false);
            },
            error: () => this.isDetailLoading.set(false)
        });
    }

    closeDetail(): void {
        this.selectedBorrowId.set(null);
        this.selectedBorrowDetail.set(null);
    }
}