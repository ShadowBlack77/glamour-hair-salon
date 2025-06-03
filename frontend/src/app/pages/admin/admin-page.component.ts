import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthHeaderComponent } from "@lib/auth";
import { HeaderComponent } from "@lib/shared/header";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  imports: [
    RouterModule, 
    HeaderComponent, 
    AuthHeaderComponent
  ]
})
export class AdminPageComponent {}