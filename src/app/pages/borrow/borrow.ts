import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorrowStore } from './borrow.store';
import { BorrowDetailComponent } from './components/borrow-detail/borrow-detail';
import { BorrowFormComponent } from './components/borrow-form/borrow-form';

@Component({
    selector: 'app-borrow',
    standalone: true,
    imports: [CommonModule, BorrowDetailComponent, BorrowFormComponent],
    templateUrl: './borrow.html',
    providers: [BorrowStore]
})
export class BorrowPage implements OnInit {
    readonly store = inject(BorrowStore);

    // Ui state
    isFormOpen = signal<boolean>(false);

    @Input() set borrowId(id: string | null) {
        if (id) {
            this.store.selectBorrow(id);
        }
    }

    ngOnInit(): void {
        this.store.loadBorrows();
    }

    openBorrowForm(): void {
        this.isFormOpen.set(true);
    }

    handleActionSuccess(borrowId?: string): void {
        this.isFormOpen.set(false);
        this.store.loadBorrows();

        if (borrowId) {
            this.store.selectedBorrowId.set(null);
            this.store.selectBorrow(borrowId);
        } else {
            this.store.closeDetail();
        }
    }
}