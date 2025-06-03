import { Booking } from "../models/booking.model";
import { createReducer, on } from "@ngrx/store";
import * as BookingActions from './booking.actions';
import { DEFAULT_LOADING_STATE, LoadingState, patchLoadingState, setStateAsError } from "@lib/core/loadable";

export interface BookingState {
  readonly booking: LoadingState<Booking>
}

export const initialState: BookingState = {
  booking: DEFAULT_LOADING_STATE
}

export const bookingReducer = createReducer(
  initialState,
  on(BookingActions.loadUserBookingSuccess, (state, { booking }) => ({
    ...state,
    booking: patchLoadingState(state.booking, booking)
  })),
  on(BookingActions.loadUserBookingFailure, (state, { error }) => ({
    ...state,
    booking: setStateAsError(state.booking, error)
  })),
  on(BookingActions.saveUserBookingSuccess, (state, { booking }) => ({
    ...state,
    booking: patchLoadingState(state.booking, booking)
  }))
);