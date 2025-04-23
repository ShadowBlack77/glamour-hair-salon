import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BookingService } from "../services/booking.service";
import { loadUserBooking, loadUserBookingFailure, loadUserBookingSuccess, saveUserBooking, saveUserBookingFailure, saveUserBookingSuccess } from "./booking.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BookingEffects {

  private readonly _bookingService: BookingService = inject(BookingService);
  private readonly _actions$: Actions = inject(Actions);

  loadUserBooking$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadUserBooking),
      switchMap(() => {
        return this._bookingService.get().pipe(
          map((booking) => {
            return loadUserBookingSuccess({ booking })
          }),
          catchError((error: HttpErrorResponse) => {
            return of(loadUserBookingFailure({ error }));
          })
        )
      })
    )
  });

  saveUSerBooking$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(saveUserBooking),
      switchMap(({ booking }) => {
        return this._bookingService.save(booking).pipe(
          map((booking) => {
            return saveUserBookingSuccess({ booking });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(saveUserBookingFailure({ error }));
          })
        )
      })
    )
  })
}