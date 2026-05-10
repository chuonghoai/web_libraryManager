import { Injectable, inject, signal } from '@angular/core';
import { ReaderService } from '../../features/reader/services/reader.service';
import { Reader } from '../../features/reader/models/reader.model';
import { CreateReaderDto } from '../../features/reader/dtos/reader.dto';

@Injectable()
export class ReaderStore {
    private readerService = inject(ReaderService);

    // Data state
    readonly readers = signal<Reader[]>([]);
    readonly isLoading = signal<boolean>(false);
    readonly errorMessage = signal<string | null>(null);

    readonly selectedReaderId = signal<string | null>(null);
    readonly selectedReaderDetail = signal<Reader | null>(null);
    readonly isDetailLoading = signal<boolean>(false);

    /**
     * Load all readers
     */
    loadReaders(): void {
        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.readerService.fetchReaders().subscribe({
            next: (response) => {
                if (response.success) {
                    this.readers.set(response.data);
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
     * Get reader detail
     */
    selectReader(id: string): void {
        if (this.selectedReaderId() === id) return;

        this.selectedReaderId.set(id);
        this.selectedReaderDetail.set(null);
        this.isDetailLoading.set(true);

        this.readerService.getReader(id).subscribe({
            next: (response) => {
                if (response.success) this.selectedReaderDetail.set(response.data);
                this.isDetailLoading.set(false);
            },
            error: () => this.isDetailLoading.set(false)
        });
    }

    /**
     * Close component reader detail and clear data state
     */
    closeDetail(): void {
        this.selectedReaderId.set(null);
        this.selectedReaderDetail.set(null);
    }

    /**
     * Call api delete reader is selected
     */
    deleteSelectedReader(onSuccess: () => void): void {
        const id = this.selectedReaderId();
        if (!id) return;

        this.readerService.deleteReader(id).subscribe({
            next: (res) => {
                if (res.success) {
                    this.readers.update(list => list.filter(r => r.id !== id));
                    this.closeDetail();
                    onSuccess();
                }
            },
            error: (err) => this.errorMessage.set(err.error?.message || 'Không thể xóa độc giả.')
        });
    }

    /**
     * Save reader: Create or update
     */
    saveReader(dto: CreateReaderDto, mode: 'create' | 'edit', onSuccess: () => void): void {
        if (mode === 'edit') {
            const currentId = this.selectedReaderId();
            if (!currentId) return;

            this.readerService.updateReader(currentId, dto).subscribe(res => {
                if (res.success) {
                    const updatedData = res.data;
                    this.readers.update(list => list.map(r => r.id === currentId ? updatedData : r));
                    this.selectedReaderDetail.set(updatedData);
                    onSuccess();
                }
            });
        } else {
            this.readerService.createReader(dto).subscribe(res => {
                if (res.success) {
                    const newData = res.data;
                    this.readers.update(list => [newData, ...list]);
                    this.selectedReaderId.set(newData.id);
                    this.selectedReaderDetail.set(newData);
                    onSuccess();
                }
            });
        }
    }
}