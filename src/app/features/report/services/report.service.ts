import { Injectable } from "@angular/core";
import { ReportRepo } from "../repo/report.repo";
import { Observable } from "rxjs/internal/Observable";
import { ApiResponse } from "../../../core/models/api-response.model";
import { ReportModel } from "../models/report.model";

@Injectable({ providedIn: 'root' })
export class ReportService {
    constructor(private reportRepo: ReportRepo) { }

    /**
     * Get dashboard report
     * @returns ReportModel
     */
    getDashboardReport(): Observable<ApiResponse<ReportModel>> {
        return this.reportRepo.getDashboardReport();
    }
}