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
        // return this.http.get<ApiResponse<Book[]>>(this.apiUrl);
        return of({
            success: true,
            message: 'Success',
            data: [
                {
                    id: "1",
                    title: 'Book 1',
                    author: 'Author 1',
                    publishedYear: 2022
                },
                {
                    id: "2",
                    title: 'Book 2',
                    author: 'Author 2',
                    publishedYear: 2023
                }
            ]
        });
    }

    /**
     * GET /books/:id
     * @param id
     * @returns BookDetail
     */
    getById(id: string): Observable<ApiResponse<BookDetail>> {
        // return this.http.get<ApiResponse<BookDetail>>(`${this.apiUrl}/${id}`);
        return of({
            success: true,
            message: "Success",
            data: {
                id: id,
                title: 'Book 1',
                author: 'Author 1',
                publishedYear: 2022,
                description: 'Description 1',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    }

    /**
     * POST /books
     * @body CreateBookDTO
     * @returns BookDetail
     */
    create(dto: CreateBookDto): Observable<ApiResponse<BookDetail>> {
        // return this.http.post<ApiResponse<BookDetail>>(this.apiUrl, dto);
        return of({
            success: true,
            message: "Success",
            data: {
                id: "1564894",
                title: dto.title,
                author: dto.author,
                publishedYear: dto.publishedYear,
                description: dto.description,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    }

    /**
     * PUT /books/:id
     * @param id
     * @body CreateBookDTO
     * @returns BookDetail
     */
    update(id: string, dto: CreateBookDto): Observable<ApiResponse<BookDetail>> {
        // return this.http.put<ApiResponse<BookDetail>>(`${this.apiUrl}/${id}`, dto);
        return of({
            success: true,
            message: "Success",
            data: {
                id: id,
                title: dto.title,
                author: dto.author,
                publishedYear: dto.publishedYear,
                description: dto.description,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })
    }

    /**
     * DELETE /books/:id
     * @param id
     * @returns null
     */
    delete(id: string): Observable<ApiResponse<null>> {
        // return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
        return of({
            success: true,
            message: "Success",
            data: null
        })
    }
}