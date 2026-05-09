import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../features/book/services/book.service';
import { Book, BookDetail } from '../../features/book/models/book.model';
import { BookDetailComponent } from './components/book-detail/book-detail';
import { BookFormComponent } from './components/book-form/book-form';
import { CreateBookDto } from '../../features/book/dtos/book.dto';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal';

@Component({
    selector: 'app-book',
    standalone: true,
    imports: [CommonModule, BookDetailComponent, BookFormComponent, ConfirmModalComponent],
    templateUrl: './book.html',
})
export class BookPage implements OnInit {
    private bookService = inject(BookService);

    books = signal<Book[]>([]);
    isLoading = signal<boolean>(false);
    errorMessage = signal<string | null>(null);

    selectedBookId = signal<string | null>(null);
    selectedBookDetail = signal<BookDetail | null>(null);
    isDetailLoading = signal<boolean>(false);

    isFormOpen = signal<boolean>(false);
    formMode = signal<'create' | 'edit'>('create');

    isConfirmOpen = signal<boolean>(false);

    ngOnInit(): void {
        this.loadBooks();
    }

    // Fetch list book in main layout
    loadBooks(): void {
        this.isLoading.set(true);
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

    // Fetch detail book when click book in list
    selectBook(id: string): void {
        if (this.selectedBookId() === id) return;

        this.selectedBookId.set(id);
        this.selectedBookDetail.set(null);
        this.isDetailLoading.set(true);

        this.bookService.getBook(id).subscribe({
            next: (response) => {
                if (response.success) {
                    this.selectedBookDetail.set(response.data);
                }
                this.isDetailLoading.set(false);
            },
            error: (err) => {
                this.isDetailLoading.set(false);
            }
        });
    }

    // Close book detail component
    closeDetail(): void {
        this.selectedBookId.set(null);
        this.selectedBookDetail.set(null);
    }

    // Delete book in component detail
    onDeleteBook(): void {
        this.isConfirmOpen.set(true);
    }

    handleConfirmDelete(result: boolean): void {
        const id = this.selectedBookId();
        this.isConfirmOpen.set(false);

        if (result && id) {
            this.bookService.deleteBook(id).subscribe({
                next: (res) => {
                    if (res.success) {
                        this.books.update(list => list.filter(b => b.id !== id));
                        this.closeDetail();
                    }
                },
                error: (err) => {
                    this.errorMessage.set(err.error?.message || 'Không thể xóa sách vào lúc này.');
                }
            });
        }
    }

    openCreateForm(): void {
        this.formMode.set('create');
        this.isFormOpen.set(true);
    }

    openEditForm(): void {
        this.formMode.set('edit');
        this.isFormOpen.set(true);
    }

    handleSaveBook(dto: CreateBookDto): void {
        if (this.formMode() === 'edit') {
            const currentId = this.selectedBookId();
            if (currentId) {
                this.bookService.updateBook(currentId, dto).subscribe(res => {
                    if (res.success) {
                        const updatedData = res.data;
                        this.books.update(list => list.map(b => b.id === currentId ? updatedData : b));
                        this.selectedBookDetail.set(updatedData);
                        this.isFormOpen.set(false);
                    }
                });
            }
        } else {
            // TRƯỜNG HỢP CREATE
            this.bookService.createBook(dto).subscribe(res => {
                if (res.success) {
                    const newData = res.data;
                    this.books.update(list => [newData, ...list]);
                    this.selectedBookId.set(newData.id);
                    this.selectedBookDetail.set(newData);
                    this.isFormOpen.set(false);
                }
            });
        }
    }
}