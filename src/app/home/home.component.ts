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
    searchInput: string = '';
    searchLocation: string = '';
    favoriteForecasts: { location: string; data: WeatherForecast | null }[] = [];
    searchResults: WeatherForecast | null = null;
    errorMessage: string = '';

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

    addFavorite(input: string): void {
        this.weatherService.getForecast(input).subscribe({
            next: data => {
                const cityName = data.location;

                if (!cityName) {
                    alert('Could not determine city name from API response.');
                    return;
                }

                if (this.favoriteForecasts.some(f => f.location.toLowerCase() === cityName.toLowerCase())) {
                    alert(`${cityName} is already in your favorites.`);
                    return;
                }

                this.favoriteForecasts.push({ location: cityName, data });

                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    const parsed = JSON.parse(storedUser);
                    if (!parsed.favorites) {
                        parsed.favorites = [];
                    }
                    parsed.favorites.push(cityName);
                    localStorage.setItem('user', JSON.stringify(parsed));
                }

                this.searchLocation = '';
                this.errorMessage = '';
            },
            error: err => {
                console.error('Error fetching forecast:', err);
                alert('Failed to add favorite due to API error.');
            }
        });
    }


    search(): void {
        if (!this.searchInput.trim()) return;

        this.searchLocation = this.searchInput;

        this.weatherService.getForecast(this.searchInput).subscribe(data => {
            this.searchResults = data;
        });
    }

    removeFavorite(city: string): void {
        this.favoriteForecasts = this.favoriteForecasts.filter(f => f.location !== city);

        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);
            user.favorites = user.favorites.filter((loc: string) => loc !== city);
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

}
