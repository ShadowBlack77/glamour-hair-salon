import { createAction, props } from "@ngrx/store";
import { Cart } from "../models/cart.model";
import { Product } from "@lib/glamour/products";

export const loadCart = createAction('[Cart] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ cart: Cart }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: any }>()
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product }>()
);

export const addToCartSucces = createAction('[Cart] Add To Cart Success');

export const addToCartFailure = createAction(
  '[Cart] Add To Cart Failure',
  props<{ error: any }>()
);

export const updateProductCartQuantity = createAction(
  '[Cart] Update Product Cart Quantity',
  props<{ id: string, quantity: number }>()
);

export const updateProductCartQuantitySuccess = createAction(
  '[Cart] Update Product Cart Quantity Success'
);

export const updateProductCartQuantityFailure = createAction(
  '[Cart] Update Product Cart Quantity Failure',
  props<{ error: any }>()
);