import { Injectable, inject, signal, computed } from '@angular/core';
import { BorrowService } from '../../../../features/borrow/services/borrow.service';
import { BookService } from '../../../../features/book/services/book.service';
import { BorrowDetail, BorrowItem } from '../../../../features/borrow/models/borrow.model';
import { Book } from '../../../../features/book/models/book.model';
import { BorrowStore } from '../../borrow.store';

export type SidePanelState = 'NONE' | 'READER_BORROWS' | 'BOOK_LIST' | 'RETURN_CART';

export interface BorrowCartItem {
    book: Book;
    quantity: number;
}

export interface ReturnCartItem {
    item: BorrowItem;
    quantity: number;
}

@Injectable()
export class BorrowFormStore {
    private borrowService = inject(BorrowService);
    private bookService = inject(BookService);
    private borrowStore = inject(BorrowStore);

    // Form State
    readonly readerCode = signal('');
    readonly borrowDetail = signal<BorrowDetail | null>(null);

    // Books State
    readonly books = signal<Book[]>([]);
    readonly bookSearchQuery = signal('');
    readonly filteredBooks = computed(() => {
        const query = this.bookSearchQuery().toLowerCase().trim();
        if (!query) return this.books();
        return this.books().filter(b =>
            b.title.toLowerCase().includes(query) || b.author.toLowerCase().includes(query)
        );
    });

    // Carts State
    readonly borrowCart = signal<BorrowCartItem[]>([]);
    readonly returnCart = signal<ReturnCartItem[]>([]);

    // UI State
    readonly activeSidePanel = signal<SidePanelState>('NONE');
    readonly isSearchingReader = signal(false);
    readonly errorMessage = signal('');

    // Actions
    searchReader(): void {
        const code = this.readerCode().trim();
        if (!code) return;

        this.isSearchingReader.set(true);
        this.errorMessage.set('');

        this.borrowService.findBorrowByReaderCode(code).subscribe({
            next: (res) => {
                if (res.success) {
                    this.borrowDetail.set(res.data);
                } else {
                    this.borrowDetail.set(null);
                    this.errorMessage.set(res.message);
                }
                this.isSearchingReader.set(false);
            },
            error: () => {
                this.borrowDetail.set(null);
                this.errorMessage.set('Không tìm thấy độc giả hoặc có lỗi xảy ra.');
                this.isSearchingReader.set(false);
            }
        });
    }

    openPanel(panel: SidePanelState): void {
        this.activeSidePanel.set(panel);
    }

    closePanel(): void {
        this.activeSidePanel.set('NONE');
    }

    // Borrow actions
    loadAllBooksForBorrow(): void {
        this.openPanel('BOOK_LIST');
        if (this.books().length === 0) {
            this.bookService.fetchBooks().subscribe(res => {
                if (res.success) this.books.set(res.data);
            });
        }
    }

    addBookToBorrowCart(book: Book): void {
        if (book.stock <= 0) return;

        this.borrowCart.update(cart => {
            const existing = cart.find(c => c.book.id === book.id);
            if (existing) {
                if (existing.quantity < book.stock) {
                    return cart.map(c => c.book.id === book.id ? { ...c, quantity: c.quantity + 1 } : c);
                }
                return cart;
            }
            return [...cart, { book, quantity: 1 }];
        });
    }

    updateBorrowCartQty(bookId: string, delta: number): void {
        this.borrowCart.update(cart => {
            return cart.map(c => {
                if (c.book.id === bookId) {
                    const newQty = c.quantity + delta;
                    if (newQty <= 0) return null;
                    if (newQty > c.book.stock) return c;
                    return { ...c, quantity: newQty };
                }
                return c;
            }).filter(c => c !== null) as BorrowCartItem[];
        });
    }

    submitBorrow(onSuccess: () => void): void {
        const detail = this.borrowDetail();
        if (!detail || this.borrowCart().length === 0) return;

        const itemsToBorrow = this.borrowCart().map(c => ({
            bookId: c.book.id,
            quantity: c.quantity
        }));

        this.borrowService.borrowBook(detail.readerId, { items: itemsToBorrow }).subscribe(res => {
            if (res.success) {
                this.borrowStore.loadBorrows();
                this.borrowStore.selectBorrow(res.data.id);

                onSuccess();
            }
        });
    }

    // Return actions
    isItemInReturnCart(itemId: string): boolean {
        return this.returnCart().some(c => c.item.id === itemId);
    }

    toggleReturnItem(item: BorrowItem, isChecked: boolean): void {
        if (isChecked) {
            this.returnCart.update(cart => [...cart, { item, quantity: item.quantity }]);
            this.openPanel('RETURN_CART');
        } else {
            this.returnCart.update(cart => cart.filter(c => c.item.id !== item.id));
            if (this.returnCart().length === 0) this.closePanel();
        }
    }

    updateReturnCartQty(itemId: string, delta: number): void {
        this.returnCart.update(cart => {
            return cart.map(c => {
                if (c.item.id === itemId) {
                    const newQty = c.quantity + delta;
                    if (newQty < 1) return c;
                    if (newQty > c.item.quantity) return c;
                    return { ...c, quantity: newQty };
                }
                return c;
            });
        });
    }

    submitReturn(onSuccess: () => void): void {
        const detail = this.borrowDetail();
        if (!detail || this.returnCart().length === 0) return;

        const itemsToReturn = this.returnCart().map(c => ({
            borrowItemId: c.item.id,
            bookId: c.item.bookId,
            quantity: c.quantity
        }));

        this.borrowService.returnBooks(detail.id, { items: itemsToReturn }).subscribe(res => {
            if (res.success) {
                this.borrowStore.loadBorrows();

                if (res.data && res.data.totalBooks > 0) this.borrowStore.selectBorrow(res.data.id);
                else this.borrowStore.closeDetail();

                onSuccess();
            }
        });
    }
}