import { Component, inject, input, InputSignal, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { Product } from "../../../products/model/product.model";
import { addToCart } from "../../store/cart.actions";
import { CartState } from "../../store/cart.reducer";
import { Store } from "@ngrx/store";
import { map, Subject, takeUntil } from "rxjs";
import { selectCart } from "../../store/cart.selector";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  imports: [
    CommonModule
  ]
})
export class CartButtonComponent implements OnInit, OnDestroy {

  private readonly _cartStore: Store<CartState> = inject(Store);
  private readonly _destroy$: Subject<void> = new Subject<void>();
  private readonly _router: Router = inject(Router);

  readonly product: InputSignal<Product> = input.required();
  readonly isProductInCart: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this._cartStore.select(selectCart).pipe(
      takeUntil(this._destroy$),
      map((cart) => {
        return cart.data?.items.some((item) => item.id === this.product().id) ?? false;
      })
    ).subscribe({
      next: (inCart) => {
        this.isProductInCart.set(inCart);
      }
    }) 
  }

  addToCart(): void {
    if (this.isProductInCart()) {
      this._router.navigate(['/cart']);
      
      return;
    }

    this._cartStore.dispatch(addToCart({ product: this.product() }));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}