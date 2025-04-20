import { Component } from "@angular/core";
import { CartListComponent } from "@glamour/features";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  imports: [
    CartListComponent
  ]
})
export class CartPageComponent {}