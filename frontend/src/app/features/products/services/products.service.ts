import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";
import { Product } from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  getAll(): Observable<Product[]> {
    return of([
      {
        id: '1',
        name: 'Angular Jacket',
        description: 'Very nice jacket',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzNE9pJ6LAX48GsRMZWifndIad7epzIWPn-w&s',
        price: 199.99,
        featured: true,
        stockQuantity: 1
      },
      {
        id: '2',
        name: 'Angular Hat',
        description: 'Very nice Hat',
        imageUrl: 'https://i.ebayimg.com/images/g/IG4AAOSwh-1W6Vcj/s-l1200.jpg',
        price: 89.99,
        featured: true,
        stockQuantity: 10
      }
    ] as Product[]);
  }
}