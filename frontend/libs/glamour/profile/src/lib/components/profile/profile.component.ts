import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { AuthService, User } from "@lib/auth";
import { ActivedBookingComponent } from "@lib/glamour/booking";
import { Observable } from "rxjs";

@Component({
  selector: 'lib-profile',
  templateUrl: './profile.component.html',
  imports: [
    CommonModule,
    ActivedBookingComponent,
]
})
export class ProfileComponent {

  private readonly _authService: AuthService = inject(AuthService);

  readonly userProfile$: Observable<User | undefined> = this._authService.user$.asObservable();
}