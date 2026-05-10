import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reader } from '../../../../features/reader/models/reader.model';

@Component({
    selector: 'app-reader-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './reader-detail.html',
})
export class ReaderDetailComponent {
    @Input({ required: true }) detail!: Reader;

    @Output() close = new EventEmitter<void>();
    @Output() edit = new EventEmitter<void>();
    @Output() delete = new EventEmitter<void>();
}