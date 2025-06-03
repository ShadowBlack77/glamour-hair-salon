import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { Booking } from "../models/booking.model";
import { ENV_CONFIG, EnvConfig } from "@lib/core/environments";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _envConfig: EnvConfig = inject(ENV_CONFIG);

  get(): Observable<Booking> {
    return this._httpClient.get<Booking>(`${this._envConfig.backendUrl}/booking`, { withCredentials: true })
  }

  save(booking: any): Observable<Booking> {
    return this._httpClient.post<Booking>(`${this._envConfig.backendUrl}/booking/save`, booking, { withCredentials: true }).pipe(
      map((data: any) => {
        return data.content;
      })
    );
  }
}