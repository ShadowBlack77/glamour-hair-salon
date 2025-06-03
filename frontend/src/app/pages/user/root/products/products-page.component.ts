import { Component } from "@angular/core";
import { ProductsListComponent } from "@lib/glamour/products";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  imports: [
    ProductsListComponent
  ]
})
export class ProductsPageComponent {}