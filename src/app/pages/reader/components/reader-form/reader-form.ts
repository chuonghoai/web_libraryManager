import { Component, Input, Output, EventEmitter, OnInit, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reader } from '../../../../features/reader/models/reader.model';
import { CreateReaderDto } from '../../../../features/reader/dtos/reader.dto';

@Component({
    selector: 'app-reader-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './reader-form.html',
})
export class ReaderFormComponent implements OnInit {
    private fb = inject(FormBuilder);

    @Input() readerData: Reader | null = null;
    @Output() save = new EventEmitter<CreateReaderDto>();
    @Output() cancel = new EventEmitter<void>();

    readerForm!: FormGroup;

    ngOnInit(): void {
        this.initForm();
    }

    private initForm(): void {
        this.readerForm = this.fb.group({
            name: [this.readerData?.name || '', [Validators.required, Validators.pattern('^[^0-9]+$')]],

            phone: [this.readerData?.phone || '', [Validators.required, Validators.pattern('^[0-9]+$')]]
        });
    }

    get nameControl() { return this.readerForm.get('name'); }
    get phoneControl() { return this.readerForm.get('phone'); }

    onSubmit(): void {
        if (this.readerForm.valid) {
            this.save.emit(this.readerForm.value);
        }
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: Event) {
        this.cancel.emit();
    }
}