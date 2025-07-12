import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
    location: string;
}

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private baseUrl = 'http://localhost:5256/weatherforecast';

    constructor(private http: HttpClient) { }

    getForecast(location: string): Observable<WeatherForecast> {
        return this.http.get<WeatherForecast>(`${this.baseUrl}/by-location/${location}`);
    }

}
