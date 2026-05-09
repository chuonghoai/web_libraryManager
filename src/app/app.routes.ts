import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'book', loadComponent: () => import('./pages/book/book').then(m => m.BookPage) },

    /**
     * localhost:4200 -> localhost:4200/book
     */
    { path: '', redirectTo: 'book', pathMatch: 'full' },

    /**
     * Url invalid -> localhost:4200/book
     */
    { path: '**', redirectTo: 'book' }
];