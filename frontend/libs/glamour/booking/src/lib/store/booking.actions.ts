import { createAction, props } from "@ngrx/store";
import { Booking } from "../models/booking.model";

export const loadUserBooking = createAction(
  '[Booking] Load User Booking',
);

export const loadUserBookingSuccess = createAction(
  '[Booking] Load User Booking Success',
  props<{ booking: Booking }>()
);

export const loadUserBookingFailure = createAction(
  '[Booking] Load User Booking Failure',
  props<{ error: any }>()
);

export const saveUserBooking = createAction(
  '[Booking] Save User Booking',
  props<{ booking: Booking }>()
);

export const saveUserBookingSuccess = createAction(
  '[Booking] Save User Booking Success',
  props<{ booking: Booking }>()
);

export const saveUserBookingFailure = createAction(
  '[Booking] Save User Booking Failure',
  props<{ error: any }>()
)