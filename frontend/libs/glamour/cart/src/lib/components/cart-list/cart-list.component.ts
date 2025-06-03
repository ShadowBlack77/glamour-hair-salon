import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { CartState } from "../../store/cart.reducer";
import { selectCart } from "../../store/cart.selector";
import { CommonModule, CurrencyPipe, NgOptimizedImage } from "@angular/common";
import { Cart } from "../../models/cart.model";
import { updateProductCartQuantity } from "../../store/cart.actions";
import { PayoutsButtonComponent } from "@lib/glamour/payouts";

@Component({
  selector: 'lib-cart-list',
  templateUrl: './cart-list.component.html',
  imports: [
    CurrencyPipe,
    CommonModule,
    NgOptimizedImage,
    PayoutsButtonComponent
  ]
})
export class CartListComponent implements OnInit, OnDestroy {

  private readonly _cartStore: Store<CartState> = inject(Store);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly cart: WritableSignal<Cart | undefined> = signal(undefined);

  ngOnInit(): void {
    this._cartStore.select(selectCart).pipe(
      takeUntil(this._destroy$),
    ).subscribe({
      next: (cart) => {
        this.cart.set(cart.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  increase(id: string, quantity: number): void {
    this._cartStore.dispatch(updateProductCartQuantity({ id, quantity: quantity + 1  }));
  }

  decrease(id: string, quantity: number): void {
    if (quantity > 0) {
      this._cartStore.dispatch(updateProductCartQuantity({ id, quantity: quantity - 1  }));
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}