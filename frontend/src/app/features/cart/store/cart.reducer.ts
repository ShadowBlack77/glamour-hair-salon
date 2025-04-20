import { DEFAULT_LOADING_STATE, LoadingState, patchLoadingState, setStateAsError, setStateAsLoading } from "@glamour/core"
import { Cart } from "../models/cart.model"
import { createReducer, on } from "@ngrx/store";
import * as CartActions from './cart.actions';

export interface CartState {
  cart: LoadingState<Cart | undefined>;
}

export const initialState: CartState = {
  cart: DEFAULT_LOADING_STATE
}

export const cartReducer = createReducer(
  initialState,
  on(CartActions.loadCart, (state) => ({
    ...state,
    cart: setStateAsLoading(state.cart)
  })),
  on(CartActions.loadCartSuccess, (state, { cart }) => {
    return {
      ...state,
      cart: patchLoadingState(state.cart, cart)
    }
  }),
  on(CartActions.loadCartFailure, (state, { error }) => ({
    ...state,
    cart: setStateAsError(state.cart, error)
  })),
  on(CartActions.addToCart, (state, { product }) => {

    const currentCart = state.cart!.data!;
    const items = currentCart.items;

    const exists = items.find(item => item.id === product.id);

    const updatedItems = exists ? items.map(item =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )  : [
      ...items,
      {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1
      }
    ];

    const updatedCart: Cart = {
      ...currentCart,
      items: updatedItems,
      totalQuantity: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
    };

    return {
      ...state,
      cart: patchLoadingState(state.cart, updatedCart)
    }
  }),
  on(CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    cart: setStateAsError(state.cart, error)
  }))
);
