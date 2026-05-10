import { Component, Input, Output, EventEmitter, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookDetail } from '../../../../features/book/models/book.model';
import { CreateBookDto } from '../../../../features/book/dtos/book.dto';

@Component({
    selector: 'app-book-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './book-form.html',
})
export class BookFormComponent implements OnInit {
    private fb = inject(FormBuilder);

    @Input() bookData: BookDetail | null = null;
    @Output() save = new EventEmitter<CreateBookDto>();
    @Output() cancel = new EventEmitter<void>();

    bookForm!: FormGroup;

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.bookForm = this.fb.group({
            title: [this.bookData?.title || '', [Validators.required]],
            author: [this.bookData?.author || '', [Validators.required]],
            publishedYear: [this.bookData?.publishedYear || new Date().getFullYear(), [Validators.required, Validators.min(1000)]],
            stock: [this.bookData?.stock || 0, [Validators.required, Validators.min(0)]],
            description: [this.bookData?.description || '']
        });
    }

    onSubmit(): void {
        if (this.bookForm.valid) {
            this.save.emit(this.bookForm.value);
        }
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: Event) {
        this.cancel.emit();
    }
}