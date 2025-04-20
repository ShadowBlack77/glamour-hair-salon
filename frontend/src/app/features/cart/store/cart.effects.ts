import { inject, Injectable } from "@angular/core";
import { CartService } from "../services/cart.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addToCart, addToCartFailure, addToCartSucces, loadCart, loadCartFailure, loadCartSuccess } from "./cart.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { Cart } from "../models/cart.model";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class CartEffects {

  private readonly _cartSevice: CartService = inject(CartService);
  private readonly _actions$: Actions = inject(Actions);

  loadCart$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadCart),
      switchMap(() => {
        return this._cartSevice.load().pipe(
          map((cart: Cart) => {
            return loadCartSuccess({ cart });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(loadCartFailure({ error }))
          })
        )
      })
    )
  })

  addToCart$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(addToCart),
      switchMap(({ product }) => {
        return this._cartSevice.add(product).pipe(
          map(() => {
            return addToCartSucces();
          }),
          catchError((error: HttpErrorResponse) => {
            return of(addToCartFailure({ error }))
          })
        )
      })
    )
  })
}