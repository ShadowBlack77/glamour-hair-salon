import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadProducts, loadProductsFailure, loadProductsSuccess } from "./products.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ProductsService } from "../services/products.service";
import { Product } from "../model/product.model";

@Injectable()
export class ProductsEffects {

  private readonly _productsService: ProductsService = inject(ProductsService);
  private readonly _actions$: Actions = inject(Actions);

  loadProducts$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(loadProducts),
      switchMap(() => {
        return this._productsService.getAll().pipe(
          map((products: Product[]) => {
            return loadProductsSuccess({ products });
          }),
          catchError((error: HttpErrorResponse) => {
            return of(loadProductsFailure({ error }))
          })
        )
      })
    )
  });
}