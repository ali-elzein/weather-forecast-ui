import { Component, signal, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [HttpClientModule, RouterOutlet],
    template: '<router-outlet></router-outlet>',
    styleUrl: './app.css'
})
export class App {}
