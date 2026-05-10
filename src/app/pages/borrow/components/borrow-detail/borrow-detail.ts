import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowDetail } from '../../../../features/borrow/models/borrow.model';

@Component({
    selector: 'app-borrow-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './borrow-detail.html',
})
export class BorrowDetailComponent {
    @Input({ required: true }) detail!: BorrowDetail;
    @Output() close = new EventEmitter<void>();
}