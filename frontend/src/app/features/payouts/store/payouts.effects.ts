import { inject, Injectable } from "@angular/core";
import { PayoutsService } from "../services/payouts.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createCheckoutSession, createCheckoutSessionFailure, createCheckoutSessionSuccess, saveCheckoutOrder, saveCheckoutOrderFailure, saveCheckoutOrderSuccess } from "./payouts.actions";
import { catchError, map, of, switchMap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable()
export class PayoutsEffects {

  private readonly _payoutsService: PayoutsService = inject(PayoutsService);
  private readonly _actions$: Actions = inject(Actions);

  createCheckoutSession$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(createCheckoutSession),
      switchMap(({ products }) => {
        return this._payoutsService.paymentsSession(products).pipe(
          map(() => {
            return createCheckoutSessionSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            return of(createCheckoutSessionFailure({ error }));
          })
        )
      })
    )
  });

  saveCheckoutOrder$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(saveCheckoutOrder),
      switchMap(({ sessionId }) => {
        return this._payoutsService.checkoutSession(sessionId).pipe(
          map(() => {
            return saveCheckoutOrderSuccess()
          }),
          catchError((error: HttpErrorResponse) => {
            return of(saveCheckoutOrderFailure({ error }));
          })
        )
      })
    )
  })
}