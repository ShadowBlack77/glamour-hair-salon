import { inject, Injectable } from "@angular/core";
import { ENV_CONFIG, EnvConfig } from "@glamour/core";
import { map, Observable, of, tap } from "rxjs";
import { Product } from "../../products/model/product.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly _envConfig: EnvConfig = inject(ENV_CONFIG);
  private readonly _httpClient: HttpClient = inject(HttpClient);

  load(): Observable<any> {
    return this._httpClient.get(`${this._envConfig.backendUrl}/ecommerce/cart`, { withCredentials: true }).pipe(
      map((data: any) => {
        return data.content;
      })
    );
  }

  add(product: Product): Observable<unknown> {
    return this._httpClient.post(`${this._envConfig.backendUrl}/ecommerce/add-to-cart`, product, { withCredentials: true })
  }

  remove(): void {

  }
}