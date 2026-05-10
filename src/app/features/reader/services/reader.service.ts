import { inject, Injectable } from "@angular/core";
import { ReaderRepo } from "../repo/reader.repo";
import { CreateReaderDto } from "../dtos/reader.dto";
import { Observable } from "rxjs/internal/Observable";
import { ApiResponse } from "../../../core/models/api-response.model";
import { Reader } from "../models/reader.model";

@Injectable({ providedIn: 'root' })
export class ReaderService {
    private readerRepo = inject(ReaderRepo);

    /**
     * Fetch all readers
     * @returns list Reader[]
     */
    fetchReaders(): Observable<ApiResponse<Reader[]>> {
        return this.readerRepo.getAllReaders();
    }

    /**
     * Get reader by id
     * @param id
     * @returns Reader
     */
    getReader(id: string): Observable<ApiResponse<Reader>> {
        return this.readerRepo.getById(id);
    }

    /**
     * Create reader
     * @body CreateReaderDto
     * @returns Reader
     */
    createReader(dto: CreateReaderDto): Observable<ApiResponse<Reader>> {
        return this.readerRepo.create(dto);
    }

    /**
     * Update reader
     * @param id
     * @body CreateReaderDto
     * @returns Reader
     */
    updateReader(id: string, dto: CreateReaderDto): Observable<ApiResponse<Reader>> {
        return this.readerRepo.update(id, dto);
    }

    /**
     * Delete reader
     * @param id
     * @returns null
     */
    deleteReader(id: string): Observable<ApiResponse<null>> {
        return this.readerRepo.delete(id);
    }
}