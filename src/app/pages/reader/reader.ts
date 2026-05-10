import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReaderDetailComponent } from './components/reader-detail/reader-detail';
import { ReaderFormComponent } from './components/reader-form/reader-form';
import { ConfirmModalComponent } from '../../components/confirm-modal/confirm-modal';
import { CreateReaderDto } from '../../features/reader/dtos/reader.dto';
import { ReaderStore } from './reader.store';

@Component({
    selector: 'app-reader',
    standalone: true,
    imports: [CommonModule, ReaderDetailComponent, ReaderFormComponent, ConfirmModalComponent],
    templateUrl: './reader.html',
    providers: [ReaderStore]
})
export class ReaderPage implements OnInit {
    readonly store = inject(ReaderStore);

    // Ui state
    isFormOpen = signal<boolean>(false);
    formMode = signal<'create' | 'edit'>('create');
    isConfirmOpen = signal<boolean>(false);

    ngOnInit(): void {
        this.store.loadReaders();
    }

    /**
     * Open form to create or edit reader
     */
    openCreateForm(): void {
        this.formMode.set('create');
        this.isFormOpen.set(true);
    }
    openEditForm(): void {
        this.formMode.set('edit');
        this.isFormOpen.set(true);
    }

    handleSaveReader(dto: CreateReaderDto): void {
        this.store.saveReader(dto, this.formMode(), () => {
            this.isFormOpen.set(false);
        });
    }

    /**
     * Confirm delete reader
     */
    openDeleteConfirm(): void {
        this.isConfirmOpen.set(true);
    }

    handleConfirmDelete(isConfirmed: boolean): void {
        if (isConfirmed) {
            this.store.deleteSelectedReader(() => {
                this.isConfirmOpen.set(false);
            });
        } else {
            this.isConfirmOpen.set(false);
        }
    }
}