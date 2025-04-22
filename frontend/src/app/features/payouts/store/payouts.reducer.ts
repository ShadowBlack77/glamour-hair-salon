import { DEFAULT_LOADING_STATE, LoadingState, setStateAsError, setStateAsLoading } from "@glamour/core";
import { CartItem } from "../../cart/models/cart.model";
import { createReducer, on } from "@ngrx/store";
import * as PayoutsActions from './payouts.actions';

export interface PayoutsState {
  products: LoadingState<CartItem[]>
}

export const initialState: PayoutsState = {
  products: DEFAULT_LOADING_STATE
}

export const payoutsReducer = createReducer(
  initialState,
  on(PayoutsActions.createCheckoutSession, (state) => ({
    ...state,
    products: setStateAsLoading(state.products)
  })),
  on(PayoutsActions.createCheckoutSessionFailure, (state, { error }) => ({
    ...state,
    products: setStateAsError(state.products, error)
  })),
);
