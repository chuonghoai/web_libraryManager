import { Injectable, inject, signal } from '@angular/core';
import { BookService } from '../../features/book/services/book.service';
import { Book, BookDetail } from '../../features/book/models/book.model';
import { CreateBookDto } from '../../features/book/dtos/book.dto';

@Injectable()
export class BookStore {
    private bookService = inject(BookService);

    // Data state
    readonly books = signal<Book[]>([]);
    readonly isLoading = signal<boolean>(false);
    readonly errorMessage = signal<string | null>(null);

    readonly selectedBookId = signal<string | null>(null);
    readonly selectedBookDetail = signal<BookDetail | null>(null);
    readonly isDetailLoading = signal<boolean>(false);

    /**
     * Fetchs all book from API
     */
    loadBooks(): void {
        this.isLoading.set(true);
        this.errorMessage.set(null);
        this.bookService.fetchBooks().subscribe({
            next: (response) => {
                if (response.success) {
                    this.books.set(response.data);
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
     * Fetch book by id
     */
    selectBook(id: string): void {
        if (this.selectedBookId() === id) return;

        this.selectedBookId.set(id);
        this.selectedBookDetail.set(null);
        this.isDetailLoading.set(true);

        this.bookService.getBook(id).subscribe({
            next: (response) => {
                if (response.success) this.selectedBookDetail.set(response.data);
                this.isDetailLoading.set(false);
            },
            error: () => this.isDetailLoading.set(false)
        });
    }

    closeDetail(): void {
        this.selectedBookId.set(null);
        this.selectedBookDetail.set(null);
    }

    /**
     * Delete book by id
     * Call back to UI when success
     */
    deleteSelectedBook(onSuccess: () => void): void {
        const id = this.selectedBookId();
        if (!id) return;

        this.bookService.deleteBook(id).subscribe({
            next: (res) => {
                if (res.success) {
                    this.books.update(list => list.filter(b => b.id !== id));
                    this.closeDetail();
                    onSuccess();
                }
            },
            error: (err) => this.errorMessage.set(err.error?.message || 'Không thể xóa sách.')
        });
    }

    /**
     * Create or edit book
     */
    saveBook(dto: CreateBookDto, mode: 'create' | 'edit', onSuccess: () => void): void {
        if (mode === 'edit') {
            const currentId = this.selectedBookId();
            if (!currentId) return;

            this.bookService.updateBook(currentId, dto).subscribe(res => {
                if (res.success) {
                    const updatedData = res.data;
                    this.books.update(list => list.map(b => b.id === currentId ? updatedData : b));
                    this.selectedBookDetail.set(updatedData);
                    onSuccess();
                }
            });
        } else {
            this.bookService.createBook(dto).subscribe(res => {
                if (res.success) {
                    const newData = res.data;
                    this.books.update(list => [newData, ...list]);
                    this.selectedBookId.set(newData.id);
                    this.selectedBookDetail.set(newData);
                    onSuccess();
                }
            });
        }
    }
}