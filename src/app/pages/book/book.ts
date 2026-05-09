import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailComponent } from './components/book-detail/book-detail';
import { BookFormComponent } from './components/book-form/book-form';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal';
import { CreateBookDto } from '../../features/book/dtos/book.dto';
import { BookStore } from './book.store';

@Component({
    selector: 'app-book',
    standalone: true,
    imports: [CommonModule, BookDetailComponent, BookFormComponent, ConfirmModalComponent],
    templateUrl: './book.html',
    providers: [BookStore]
})
export class BookPage implements OnInit {
    readonly store = inject(BookStore);

    // Ui state
    isFormOpen = signal<boolean>(false);
    formMode = signal<'create' | 'edit'>('create');
    isConfirmOpen = signal<boolean>(false);

    ngOnInit(): void {
        this.store.loadBooks();
    }

    // Open create/edit book form
    openCreateForm(): void {
        this.formMode.set('create');
        this.isFormOpen.set(true);
    }
    openEditForm(): void {
        this.formMode.set('edit');
        this.isFormOpen.set(true);
    }

    // Save form-book (create or update)
    handleSaveBook(dto: CreateBookDto): void {
        this.store.saveBook(dto, this.formMode(), () => {
            this.isFormOpen.set(false);
        });
    }

    // Open confirm delete modal
    openDeleteConfirm(): void {
        this.isConfirmOpen.set(true);
    }

    // Save confirm delete
    handleConfirmDelete(isConfirmed: boolean): void {
        if (isConfirmed) {
            this.store.deleteSelectedBook(() => {
                this.isConfirmOpen.set(false);
            });
        } else {
            this.isConfirmOpen.set(false);
        }
    }
}