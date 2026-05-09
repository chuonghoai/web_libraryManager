import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
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

    @Input() bookData: BookDetail | null = null; // Nếu có data là mode Edit, null là mode Create
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
            description: [this.bookData?.description || '']
        });
    }

    onSubmit(): void {
        if (this.bookForm.valid) {
            this.save.emit(this.bookForm.value);
        }
    }
}