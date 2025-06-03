import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthHeaderComponent } from "@lib/auth";
import { FooterComponent } from "@lib/shared/footer";
import { HeaderComponent } from "@lib/shared/header";

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    AuthHeaderComponent
  ]
})
export class RootPageComponent {}