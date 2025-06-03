import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductsState } from "../store/products.reducer";
import { loadProducts } from "../store/products.actions";

@Injectable({
  providedIn: 'root'
})
export class LoadProductsResolver {
  private readonly _store: Store<ProductsState> = inject(Store);

  resolve(): void {
    return this._store.dispatch(loadProducts());
  }
}