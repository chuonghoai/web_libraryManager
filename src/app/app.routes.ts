import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'book', loadComponent: () => import('./pages/book/book').then(m => m.BookPage) },
            { path: 'reader', loadComponent: () => import('./pages/reader/reader').then(m => m.ReaderPage) },
            { path: 'borrow', loadComponent: () => import('./pages/borrow/borrow').then(m => m.BorrowPage) },

            { path: '', redirectTo: 'book', pathMatch: 'full' }
        ]
    },
    {
        path: '**',
        redirectTo: 'book'
    }
];