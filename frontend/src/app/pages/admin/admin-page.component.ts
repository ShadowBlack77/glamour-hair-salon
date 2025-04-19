import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthHeaderSegmentComponent } from "@glamour/core";
import { HeaderComponent } from "@glamour/shared";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  imports: [
    RouterModule, 
    HeaderComponent, 
    AuthHeaderSegmentComponent
  ]
})
export class AdminPageComponent {}