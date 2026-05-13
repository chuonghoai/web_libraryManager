import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../core/models/api-response.model';
import { ReportModel } from '../models/report.model';

@Injectable({ providedIn: 'root' })
export class ReportRepo {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/reports`;

    /**
     * GET /reports/dashboard
     * @requests - null
     * @returns - ReportModel
     */
    getDashboardReport(): Observable<ApiResponse<ReportModel>> {
        // return this.http.get<ApiResponse<ReportModel>>(`${this.apiUrl}/dashboard`);
        const mockReportData: ReportModel = {
            totalBooksInStock: 1250,
            totalBooksBorrowed: 345,
            totalReaders: 128,

            mostBorrowedBooks: [
                { id: 'B001', title: 'Đắc Nhân Tâm', totalBorrowed: 45 },
                { id: 'B002', title: 'Nhà Giả Kim', totalBorrowed: 38 },
                { id: 'B003', title: 'Clean Code', totalBorrowed: 30 }
            ],

            lowStockBooks: [
                { id: 'B010', title: 'Design Patterns', stock: 2 },
                { id: 'B015', title: 'Lập trình TypeScript', stock: 1 }
            ],

            overdueReaders: [
                {
                    id: '001',
                    readerId: 'R001',
                    readerName: 'Nguyễn Văn A',
                    readerCode: 'RD-0012',
                    totalOverdueBooks: 1
                },
                {
                    id: '002',
                    readerId: 'R002',
                    readerCode: 'RD-0055',
                    readerName: 'Trần Thị B',
                    totalOverdueBooks: 2
                }
            ]
        };
        return of({
            success: true,
            message: 'Lấy dữ liệu báo cáo thành công',
            data: mockReportData
        }).pipe(delay(500));
    }
}