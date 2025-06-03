import { Component } from "@angular/core";
import { CartListComponent } from "@lib/glamour/cart";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  imports: [
    CartListComponent
  ]
})
export class CartPageComponent {}