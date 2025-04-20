import { Inject, inject, Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { Product } from "../model/product.model";
import { HttpClient } from "@angular/common/http";
import { ENV_CONFIG, EnvConfig } from "@glamour/core";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _envConfig: EnvConfig = inject(ENV_CONFIG);

  getAll(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this._envConfig.backendUrl}/ecommerce/all-products`);
  }
}