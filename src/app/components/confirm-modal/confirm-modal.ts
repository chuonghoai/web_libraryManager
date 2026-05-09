import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-modal.html',
})
export class ConfirmModalComponent {
    @Input() title: string = 'Xác nhận hành động';
    @Input() message: string = 'Bạn có chắc chắn muốn thực hiện hành động này không?';
    @Input() confirmText: string = 'Xác nhận';
    @Input() cancelText: string = 'Hủy';

    @Output() result = new EventEmitter<boolean>();

    onConfirm() {
        this.result.emit(true);
    }

    onCancel() {
        this.result.emit(false);
    }

    @HostListener('document:keydown.escape', ['$event'])
    onKeydownHandler(event: Event) {
        this.onCancel();
    }
}