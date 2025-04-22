import { createAction, props } from "@ngrx/store";
import { CartItem } from "../../cart/models/cart.model";

export const createCheckoutSession = createAction(
  '[Payouts] Create Checkout Session', 
  props<{ products: CartItem[] }>()
);

export const createCheckoutSessionSuccess = createAction(
  '[Payouts] Create Checkout Session Success'
);

export const createCheckoutSessionFailure = createAction(
  '[Payouts] Create Checkout Session Failure',
  props<{ error: any }>()
);

export const saveCheckoutOrder = createAction(
  '[Payouts] Save Checkout Order',
  props<{ sessionId: string }>()
);

export const saveCheckoutOrderSuccess = createAction(
  '[Payouts] Save Checkout Order Success'
);

export const saveCheckoutOrderFailure = createAction(
  '[Payouts] Save Checkout Order Failure',
  props<{ error: any }>()
);