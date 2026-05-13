import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.html',
})
export class HomePage {
    private router = inject(Router);

    navigateTo(path: string): void {
        this.router.navigate([`/${path}`]);
    }
}