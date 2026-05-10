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
        // return this.http.get<ApiResponse<Reader[]>>(this.apiUrl);
        return of({
            success: true,
            message: 'Lấy danh sách độc giả thành công',
            data: [
                {
                    id: '1',
                    name: 'Nguyễn Văn A',
                    phone: '0123456789',
                    code: 'R001',
                    createdAt: '2024-01-01',
                    updatedAt: '2024-01-01',
                },
                {
                    id: '2',
                    name: 'Nguyễn Văn B',
                    phone: '0123456789',
                    code: 'R002',
                    createdAt: '2024-01-01',
                    updatedAt: '2024-01-01',
                },
            ],
        });
    }

    /**
     * GET /readers/:id
     * @param id 
     * @return Reader
     */
    getById(id: string): Observable<ApiResponse<Reader>> {
        // return this.http.get<ApiResponse<Reader>>(`${this.apiUrl}/${id}`);
        return of({
            success: true,
            message: `Lấy thông tin độc giả ${id} thành công`,
            data: {
                id: id,
                name: 'Nguyễn Văn A',
                phone: '0123456789',
                code: 'R001',
                createdAt: '2024-01-01',
                updatedAt: '2024-01-01',
            },
        });
    }

    /**
     * POST /readers
     * @body CreateReaderDTO { name: string, phone: string }
     * @return Reader
     */
    create(dto: CreateReaderDto): Observable<ApiResponse<Reader>> {
        // return this.http.post<ApiResponse<Reader>>(this.apiUrl, dto);
        return of({
            success: true,
            message: 'Thêm độc giả thành công',
            data: {
                id: Date.now().toString(),
                name: dto.name,
                phone: dto.phone,
                code: 'R003',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        });
    }

    /**
     * PUT /readers/:id
     * @param id 
     * @body CreateReaderDto
     * @returns Reader
     */
    update(id: string, dto: CreateReaderDto): Observable<ApiResponse<Reader>> {
        // return this.http.put<ApiResponse<Reader>>(`${this.apiUrl}/${id}`, dto);
        return of({
            success: true,
            message: 'Cập nhật độc giả thành công',
            data: {
                id: id,
                name: dto.name,
                phone: dto.phone,
                code: 'R003',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        });
    }

    /**
     * DELETE /readers/:id
     * @param id
     * @returns null
     */
    delete(id: string): Observable<ApiResponse<null>> {
        // return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`);
        return of({
            success: true,
            message: 'Xóa độc giả thành công',
            data: null,
        });
    }
}