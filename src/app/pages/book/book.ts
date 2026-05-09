import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../features/book/services/book.service';
import { Book, BookDetail } from '../../features/book/models/book.model';
import { BookDetailComponent } from './components/book-detail/book-detail';

@Component({
    selector: 'app-book',
    standalone: true,
    imports: [CommonModule, BookDetailComponent],
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

    // Edit book in component detail
    onEditBook(): void {
        // TODO
    }

    // Delete book in component detail
    onDeleteBook(): void {
        // TODO
    }
}