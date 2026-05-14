import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportStore } from './report.store';
import { Router } from '@angular/router';

@Component({
    selector: 'app-report',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './report.html',
    providers: [ReportStore]
})
export class ReportPage implements OnInit {
    readonly store = inject(ReportStore);
    private router = inject(Router);

    ngOnInit(): void {
        this.store.loadReport();
    }

    viewBorrowDetail(borrowId: string): void {
        this.router.navigate(['/borrow'], { queryParams: { borrowId: borrowId } });
    }
}