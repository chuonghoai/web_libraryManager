import { Component, Output, EventEmitter, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BorrowFormStore } from './borrow-form.store';

@Component({
    selector: 'app-borrow-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './borrow-form.html',
    providers: [BorrowFormStore]
})
export class BorrowFormComponent {
    readonly store = inject(BorrowFormStore);

    @Output() success = new EventEmitter<void>();
    @Output() cancel = new EventEmitter<void>();

    activeTab: 'BORROW' | 'RETURN' = 'BORROW';

    switchTab(tab: 'BORROW' | 'RETURN') {
        this.activeTab = tab;
        this.store.closePanel();

        if (tab === 'BORROW') this.store.returnCart.set([]);
        if (tab === 'RETURN') this.store.borrowCart.set([]);
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: Event) {
        this.cancel.emit();
    }
}