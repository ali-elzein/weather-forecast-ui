import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherForecast } from '../services/weather.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    userName: string = '';
    favoriteForecasts: { location: string; data: WeatherForecast[] }[] = [];
    searchLocation: string = '';
    searchResults: WeatherForecast[] = [];

    constructor(private weatherService: WeatherService) { }

    ngOnInit(): void {
        const user = localStorage.getItem('user');
        if (user) {
            const parsed = JSON.parse(user);
            this.userName = parsed.name;
            const favorites = parsed.favorites || [];

            for (const loc of favorites) {
                this.weatherService.getForecast(loc).subscribe(data => {
                    this.favoriteForecasts.push({ location: loc, data });
                });
            }
        }
    }

    search(): void {
        if (!this.searchLocation.trim()) return;

        this.weatherService.getForecast(this.searchLocation).subscribe(data => {
            this.searchResults = data;
        });
    }
}
