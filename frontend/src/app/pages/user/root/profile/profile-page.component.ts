import { Component } from "@angular/core";
import { BookingFormComponent } from "@lib/glamour/booking";
import { ProfileComponent } from "@lib/glamour/profile";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  imports: [
    ProfileComponent,
    BookingFormComponent
  ]
})
export class ProfilePageComponent {}