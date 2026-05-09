import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BookRepo } from '../repos/book.repo';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Book } from '../models/book.model';

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
}