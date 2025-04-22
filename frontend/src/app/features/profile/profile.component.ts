import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService, User } from "@glamour/core";
import { Observable } from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProfileComponent {

  private readonly _authService: AuthService = inject(AuthService);

  readonly userProfile$: Observable<User | undefined> = this._authService.user$.asObservable();

  readonly bookingForm: FormGroup = new FormGroup({
    'username': new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    }),
    'email': new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.email,
        Validators.required
      ]
    }),
    'phoneNumber': new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
  })
}