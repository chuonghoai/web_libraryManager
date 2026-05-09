import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetail } from '../../../../features/book/models/book.model';

@Component({
    selector: 'app-book-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './book-detail.html',
})
export class BookDetailComponent {
    @Input({ required: true }) detail!: BookDetail;

    @Output() close = new EventEmitter<void>();
    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
}