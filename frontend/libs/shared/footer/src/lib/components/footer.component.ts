import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  imports: [
    RouterLink
  ]
})
export class FooterComponent {}