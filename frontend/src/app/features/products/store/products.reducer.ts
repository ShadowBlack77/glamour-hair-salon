import { DEFAULT_LOADING_STATE, LoadingState, patchLoadingState, setStateAsError, setStateAsLoading } from "@glamour/core";
import { Product } from "../model/product.model";
import { createReducer, on } from "@ngrx/store";
import * as ProductsActions from './products.actions';

export interface ProductsState {
  products: LoadingState<Product[]>;
  featuredProducts: LoadingState<Product[]>;
};

export const initialState: ProductsState = {
  products: DEFAULT_LOADING_STATE,
  featuredProducts: DEFAULT_LOADING_STATE
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    products: setStateAsLoading(state.products),
    featuredProducts: setStateAsLoading(state.featuredProducts)
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => {

    const fetautedProducts = products.filter((prod) => prod.featured === true);

    return {
      ...state,
      products: patchLoadingState(state.products, products),
      featuredProducts: patchLoadingState(state.featuredProducts, fetautedProducts)
    }
  }),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    products: setStateAsError(state.products, error),
    featuredProducts: setStateAsError(state.featuredProducts, error)
  }))
)