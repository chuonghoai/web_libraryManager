import { Component, OnInit, inject, signal } from '@angular/core';
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

    ngOnInit(): void {
        this.store.loadBorrows();
    }

    openBorrowForm(): void {
        this.isFormOpen.set(true);
    }

    handleActionSuccess(): void {
        this.isFormOpen.set(false);
        this.store.loadBorrows();

        if (this.store.selectedBorrowId()) {
            this.store.selectBorrow(this.store.selectedBorrowId()!);
        }
    }
}