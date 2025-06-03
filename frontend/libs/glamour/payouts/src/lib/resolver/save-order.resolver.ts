import { inject, Injectable, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { PayoutsState } from "../store/payouts.reducer";
import { saveCheckoutOrder } from "../store/payouts.actions";

@Injectable({
  providedIn: 'root'
})
export class SaveOrderResolver implements OnDestroy {

  private readonly _payoutsStore: Store<PayoutsState> = inject(Store);
  private readonly _actiavtedRoute: ActivatedRoute = inject(ActivatedRoute);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  resolve(): void {
    this._actiavtedRoute.queryParams.pipe(
      takeUntil(this._destroy$)
    ).subscribe({
      next: (param: any) => {
        const sessionId = param['session_id'];

        if (sessionId) {
          this._payoutsStore.dispatch(saveCheckoutOrder({ sessionId }));
        } 
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}