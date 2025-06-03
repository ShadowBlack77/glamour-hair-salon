import { Component, inject, input, InputSignal } from "@angular/core";
import { Store } from "@ngrx/store";
import { PayoutsState } from "../../store/payouts.reducer";
import { createCheckoutSession } from "../../store/payouts.actions";
import { CartItem } from "@lib/glamour/cart";

@Component({
  selector: 'lib-payouts-button',
  templateUrl: './payouts-button.component.html'
})
export class PayoutsButtonComponent {

  private readonly _payoutsStore: Store<PayoutsState> = inject(Store);
  
  readonly cartItems: InputSignal<CartItem[]> = input.required<CartItem[]>();

  payouts(): void {
    this._payoutsStore.dispatch(createCheckoutSession({ products: this.cartItems() }));
  }
}