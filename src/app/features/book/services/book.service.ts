import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookRepo } from '../repos/book.repo';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Book, BookDetail } from '../models/book.model';
import { CreateBookDto } from '../dtos/book.dto';

@Injectable({ providedIn: 'root' })
export class BookService {
    private bookRepo = inject(BookRepo);

    /**
     * Fetch list book
     * @returns List Book
     */
    fetchBooks(): Observable<ApiResponse<Book[]>> {
        return this.bookRepo.getAllBooks();
    }

    /**
     * Get book by id
     * @returns Book
     */
    getBook(id: string): Observable<ApiResponse<BookDetail>> {
        return this.bookRepo.getById(id);
    }

    /**
     * Create book
     * @returns Book
     */
    createBook(dto: CreateBookDto): Observable<ApiResponse<BookDetail>> {
        return this.bookRepo.create(dto);
    }

    /**
     * Update book
     * @returns Book
     */
    updateBook(id: string, dto: CreateBookDto): Observable<ApiResponse<BookDetail>> {
        return this.bookRepo.update(id, dto);
    }

    /**
     * Delete book
     * @returns null
     */
    deleteBook(id: string): Observable<ApiResponse<void>> {
        return this.bookRepo.delete(id);
    }
}