import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { BookingState } from "../../store/booking.reducer";
import { selectBooking } from "../../store/booking.selectors";
import { map, Subject, takeUntil } from "rxjs";
import { Booking } from "../../models/booking.model";

@Component({
  selector: 'app-actived-booking',
  templateUrl: './actived-booking.component.html'
})
export class ActivedBookingComponent implements OnInit, OnDestroy {

  private readonly _bookingStore: Store<BookingState> = inject(Store);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly isLoading: WritableSignal<boolean> = signal(true);
  readonly userBooking: WritableSignal<Booking | undefined> = signal(undefined);

  ngOnInit(): void {
    this._bookingStore.select(selectBooking).pipe(
      takeUntil(this._destroy$),
      map((booking) => {
        this.isLoading.set(booking.loading);
        
        return booking.data;
      })
    ).subscribe({
      next: (data) => {
        this.userBooking.set(data);
      }
    })
  }
  
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}