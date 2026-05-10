import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { ApiResponse } from "../../../core/models/api-response.model";
import { Observable, of } from "rxjs";
import { Reader } from "../models/reader.model";
import { CreateReaderDto } from "../dtos/reader.dto";

@Injectable({ providedIn: 'root' })
export class ReaderRepo {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/readers`;

    /**
     * GET /readers
     * @returns List readers
     */
    getAllReaders(): Observable<ApiResponse<Reader[]>> {
        return this.http.get<ApiResponse<Reader[]>>(this.apiUrl);
    }

    /**
     * GET /readers/:id
     * @param id 
     * @return Reader
     */
    getById(id: string): Observable<ApiResponse<Reader>> {
        return this.http.get<ApiResponse<Reader>>(`${this.apiUrl}/${id}`);
    }

    /**
     * POST /readers
     * @body CreateReaderDTO { name: string, phone: string }
     * @return Reader
     */
    create(dto: CreateReaderDto): Observable<ApiResponse<Reader>> {
        return this.http.post<ApiResponse<Reader>>(this.apiUrl, dto);
    }

    /**
     * PUT /readers/:id
     * @param id 
     * @body CreateReaderDto
     * @returns Reader
     */
    update(id: string, dto: CreateReaderDto): Observable<ApiResponse<Reader>> {
        return this.http.put<ApiResponse<Reader>>(`${this.apiUrl}/${id}`, dto);
    }

    /**
     * DELETE /readers/:id
     * @param id
     * @returns null
     */
    delete(id: string): Observable<ApiResponse<null>> {
        return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
    }
}