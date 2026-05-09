import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../features/book/services/book.service';
import { Book } from '../../features/book/models/book.model';

@Component({
    selector: 'app-book',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './book.html',
})
export class BookPage implements OnInit {
    private bookService = inject(BookService);

    books = signal<Book[]>([]);
    isLoading = signal<boolean>(false);
    errorMessage = signal<string | null>(null);

    ngOnInit(): void {
        this.loadBooks();
    }

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
                this.errorMessage.set(err.error.message || 'Lỗi kết nối đến máy chủ.');
                this.isLoading.set(false);
            }
        });
    }
}