import { Component, ViewEncapsulation } from '@angular/core';
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
  currentForecast: WeatherForecast | null = null;
  errorMessage: string = '';

  constructor(private weatherService: WeatherService) {}

  search(): void {
    if (!this.location.trim()) {
      this.errorMessage = 'Please enter a location.';
      return;
    }

    this.weatherService.getForecast(this.location).subscribe({
      next: (data) => {
        this.currentForecast = data;
        this.errorMessage = '';
      },
      error: (err) => {
        console.error(err);
        this.currentForecast = null;
        this.errorMessage = 'Could not fetch weather. Try another location.';
      }
    });
  }
}
