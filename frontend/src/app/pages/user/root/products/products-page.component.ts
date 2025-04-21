import { Component } from "@angular/core";
import { ProductsListComponent } from "@glamour/features";

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  imports: [
    ProductsListComponent
  ]
})
export class ProductsPageComponent {}