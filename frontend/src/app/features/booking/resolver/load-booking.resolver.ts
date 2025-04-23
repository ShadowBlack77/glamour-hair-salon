import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BookingState } from "../store/booking.reducer";
import { loadUserBooking } from "../store/booking.actions";

@Injectable({
  providedIn: 'root'
})
export class LoadBookingResolver {

  private readonly _bookingStore: Store<BookingState> = inject(Store);

  resolve(): void {
    this._bookingStore.dispatch(loadUserBooking());
  }
}