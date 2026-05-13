import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportStore } from './report.store';

@Component({
    selector: 'app-report',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './report.html',
    providers: [ReportStore]
})
export class ReportPage implements OnInit {
    readonly store = inject(ReportStore);

    ngOnInit(): void {
        this.store.loadReport();
    }

    viewReaderDetail(readerId: string): void {
        // this.router.navigate(['/readers'], { queryParams: { id: readerId } });
        alert(`Sẽ điều hướng và mở chi tiết độc giả có ID: ${readerId}`);
    }
}