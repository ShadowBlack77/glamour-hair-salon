import { Component, inject, Signal } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductsState } from "../../store/products.reducer";
import { Product } from "../../model/product.model";
import { toSignal } from '@angular/core/rxjs-interop'; 
import { map } from "rxjs";
import { CommonModule, NgOptimizedImage } from "@angular/common";
import { CartButtonComponent } from "@lib/glamour/cart";
import { selectAllProducts } from "../../store/products.selector";

@Component({
  selector: 'lib-products-list',
  templateUrl: './products-list.component.html',
  imports: [
    CommonModule,
    NgOptimizedImage,
    CartButtonComponent
  ]
})
export class ProductsListComponent {

  private readonly _productsStore: Store<ProductsState> = inject(Store);
  
  readonly products: Signal<Product[] | undefined> = toSignal(
    this._productsStore.select(selectAllProducts).pipe(
      map((products) => {
        return products.data
      }),
    )
  );
}