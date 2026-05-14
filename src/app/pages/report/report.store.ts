import { Injectable, inject, signal } from '@angular/core';
import { ReportService } from '../../features/report/services/report.service';
import { ReportModel } from '../../features/report/models/report.model';

@Injectable()
export class ReportStore {
    private reportService = inject(ReportService);

    // Data state
    readonly reportData = signal<ReportModel | null>(null);
    readonly isLoading = signal<boolean>(false);
    readonly errorMessage = signal<string | null>(null);

    loadReport(): void {
        this.isLoading.set(true);
        this.errorMessage.set(null);

        this.reportService.getDashboardReport().subscribe({
            next: (response) => {
                if (response.success) {
                    this.reportData.set(response.data);
                } else {
                    this.errorMessage.set(response.message);
                }
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err.error?.message || 'Lỗi kết nối đến máy chủ khi tải báo cáo.');
                this.isLoading.set(false);
            }
        });
    }
}