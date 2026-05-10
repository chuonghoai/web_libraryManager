import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../core/models/api-response.model';
import { Book, BookDetail } from '../models/book.model';
import { CreateBookDto } from '../dtos/book.dto';

@Injectable({ providedIn: 'root' })
export class BookRepo {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/books`;

    /**
     * GET /books
     * @returns List Book
     */
    getAllBooks(): Observable<ApiResponse<Book[]>> {
        return this.http.get<ApiResponse<Book[]>>(this.apiUrl);
    }

    /**
     * GET /books/:id
     * @param id
     * @returns BookDetail
     */
    getById(id: string): Observable<ApiResponse<BookDetail>> {
        return this.http.get<ApiResponse<BookDetail>>(`${this.apiUrl}/${id}`);
    }

    /**
     * POST /books
     * @body CreateBookDTO
     * @returns BookDetail
     */
    create(dto: CreateBookDto): Observable<ApiResponse<BookDetail>> {
        return this.http.post<ApiResponse<BookDetail>>(this.apiUrl, dto);
    }

    /**
     * PUT /books/:id
     * @param id
     * @body CreateBookDTO
     * @returns BookDetail
     */
    update(id: string, dto: CreateBookDto): Observable<ApiResponse<BookDetail>> {
        return this.http.put<ApiResponse<BookDetail>>(`${this.apiUrl}/${id}`, dto);
    }

    /**
     * DELETE /books/:id
     * @param id
     * @returns null
     */
    delete(id: string): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
    }
}