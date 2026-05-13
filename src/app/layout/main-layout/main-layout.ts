import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
    templateUrl: './main-layout.html',
})
export class MainLayoutComponent {
    menuItems = [
        { label: 'Sách', route: '/book', icon: 'bi-journal-bookmark' },
        { label: 'Độc giả', route: '/reader', icon: 'bi-people' },
        { label: 'Mượn/Trả', route: '/borrow', icon: 'bi-arrow-left-right' },
        { label: 'Báo cáo', route: '/report', icon: 'bi-bar-chart' }, 
    ];

    appVersion = environment.app_version;
}