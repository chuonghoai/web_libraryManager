import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: 'home', loadComponent: () => import('./pages/home/home').then(m => m.HomePage) },
            { path: 'book', loadComponent: () => import('./pages/book/book').then(m => m.BookPage) },
            { path: 'reader', loadComponent: () => import('./pages/reader/reader').then(m => m.ReaderPage) },
            { path: 'borrow', loadComponent: () => import('./pages/borrow/borrow').then(m => m.BorrowPage) },
            { path: 'report', loadComponent: () => import('./pages/report/report').then(m => m.ReportPage) },

            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];