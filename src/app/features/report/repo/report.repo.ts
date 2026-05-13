import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
        return this.http.get<ApiResponse<ReportModel>>(`${this.apiUrl}/dashboard`);
    }
}