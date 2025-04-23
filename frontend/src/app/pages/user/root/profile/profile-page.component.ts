import { Component } from "@angular/core";
import { BookingFormComponent, ProfileComponent } from "@glamour/features";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  imports: [
    ProfileComponent,
    BookingFormComponent
  ]
})
export class ProfilePageComponent {}