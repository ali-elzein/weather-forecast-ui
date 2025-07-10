import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
    name: string;
    phone: string;
    address: string;
    favorites: string[];
}

@Component({
    selector: 'app-login',
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    user: User = {
        name: '',
        phone: '',
        address: '',
        favorites: ['', '', ''],
    };

    constructor(private router: Router) { }

    onSubmit(): void {
        if (!this.user.name.trim() || !this.user.phone.trim()) {
            alert('Name and phone are required');
            return;
        }

        localStorage.setItem('user', JSON.stringify(this.user));

        this.router.navigate(['/home']);
    }
}
