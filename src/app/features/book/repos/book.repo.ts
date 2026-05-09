import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Book } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookRepo {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/books`;

    /**
     * GET /books
     * @returns List Book
     */
    getAllBooks(): Observable<ApiResponse<Book[]>> {
        // return this.http.get<ApiResponse<Book[]>>(this.apiUrl);
        return of({
            success: true,
            message: 'Success',
            data: [
                {
                    id: 1,
                    title: 'Book 1',
                    author: 'Author 1',
                    publishedYear: 2022
                },
                {
                    id: 2,
                    title: 'Book 2',
                    author: 'Author 2',
                    publishedYear: 2023
                }
            ]
        });
    }
}