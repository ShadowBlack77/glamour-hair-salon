import { Component, inject, input, InputSignal, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { addToCart } from "../../store/cart.actions";
import { CartState } from "../../store/cart.reducer";
import { Store } from "@ngrx/store";
import { map, Subject, take, takeUntil } from "rxjs";
import { selectCart } from "../../store/cart.selector";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { AuthService } from "@lib/auth";
import { Product } from "@lib/glamour/products";
import { CartItem } from "../../models/cart-item.model";

@Component({
  selector: 'lib-cart-button',
  templateUrl: './cart-button.component.html',
  imports: [
    CommonModule
  ]
})
export class CartButtonComponent implements OnInit, OnDestroy {

  private readonly _cartStore: Store<CartState> = inject(Store);
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _destroy$: Subject<void> = new Subject<void>();
  private readonly _router: Router = inject(Router);

  readonly product: InputSignal<Product> = input.required();
  readonly isProductInCart: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this._cartStore.select(selectCart).pipe(
      takeUntil(this._destroy$),
      map((cart) => {
        return cart.data?.items.some((item: CartItem) => item.id === this.product().id) ?? false;
      })
    ).subscribe({
      next: (inCart) => {
        this.isProductInCart.set(inCart);
      }
    }) 
  }

  addToCart(): void {
    this._authService.user$.pipe(
      take(1)
    ).subscribe({
      next: (user) => {
        if (user) {
          if (this.isProductInCart()) {
            this._router.navigateByUrl('/cart');
            
            return;
          }

          this._cartStore.dispatch(addToCart({ product: this.product() }));

          return;
        }

        this._router.navigateByUrl('/auth/sign-in');
      },
      error: () => {
        this._router.navigateByUrl('/auth/sign-in');
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}