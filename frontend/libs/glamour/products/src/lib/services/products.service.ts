import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ENV_CONFIG, EnvConfig } from "@lib/core/environments";
import { Product } from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _envConfig: EnvConfig = inject(ENV_CONFIG);

  getAll(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(`${this._envConfig.backendUrl}/products/`);
  }
}