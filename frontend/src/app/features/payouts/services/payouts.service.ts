import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { from, map, Observable, switchMap, take, tap } from "rxjs";
import { CartItem } from "../../cart/models/cart.model";
import { ENV_CONFIG, EnvConfig } from "@glamour/core";
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PayoutsService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _envConfig: EnvConfig = inject(ENV_CONFIG);

  paymentsSession(cartItems: CartItem[]): Observable<unknown> {
    return this._httpClient.post(`${this._envConfig.backendUrl}/payments/create-checkout-session`, { products: cartItems }, { withCredentials: true }).pipe(
      take(1),
      switchMap((res: any) => {
        return from(loadStripe(this._envConfig.stripePublicKey)).pipe(
          map((stripe) => {
            stripe?.redirectToCheckout({
              sessionId: res.id
            })
          })
        )
      })
    );
  }

  checkoutSession(sessionId: string) {
    return this._httpClient.post(`${this._envConfig.backendUrl}/payments/checkout-session`, { sessionId }, { withCredentials: true });
  }
}