import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService, WeatherForecast } from '../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.html',
  styleUrl: './weather.css',
  imports: [CommonModule, FormsModule]
})
export class WeatherComponent {
  location: string = '';
  forecasts: WeatherForecast[] = [];
  error: string = '';

  constructor(private weatherService: WeatherService) {}

  search(): void {
    this.error = '';
    if (!this.location.trim()) {
      this.error = 'Please enter a location.';
      return;
    }

    this.weatherService.getForecast(this.location).subscribe({
      next: (data) => this.forecasts = data,
      error: (err) => {
        console.error(err);
        this.error = 'Failed to retrieve weather data.';
        this.forecasts = [];
      }
    });
  }
}
