import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthHeaderSegmentComponent } from "@glamour/core";
import { FooterComponent, HeaderComponent } from "@glamour/shared";

@Component({
  selector: 'app-root-page',
  templateUrl: './root-page.component.html',
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    AuthHeaderSegmentComponent,
  ]
})
export class RootPageComponent {}