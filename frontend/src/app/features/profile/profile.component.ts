import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AuthService, User } from "@glamour/core";
import { Observable } from "rxjs";
import { ActivedBookingComponent } from "../booking/components/actived-booking/actived-booking.component";
import { BookingFormComponent } from "../forms/components/booking-form/booking-form.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    CommonModule,
    ActivedBookingComponent,
    BookingFormComponent
]
})
export class ProfileComponent {

  private readonly _authService: AuthService = inject(AuthService);

  readonly userProfile$: Observable<User | undefined> = this._authService.user$.asObservable();
}