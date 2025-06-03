import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookingState } from "./booking.reducer";

export const selectBookingState = createFeatureSelector<BookingState>('booking');

export const selectBooking = createSelector(
  selectBookingState,
  (state: BookingState) => state.booking
);