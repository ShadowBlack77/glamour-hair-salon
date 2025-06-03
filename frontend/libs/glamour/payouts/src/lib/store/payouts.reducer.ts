import { createReducer, on } from "@ngrx/store";
import * as PayoutsActions from './payouts.actions';
import { CartItem } from "@lib/glamour/cart";
import { DEFAULT_LOADING_STATE, LoadingState, setStateAsError, setStateAsLoading } from "@lib/core/loadable";

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
