import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@glamour/core";
import { take } from "rxjs";

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ResetPasswordFormComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  readonly resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: false,
      validators: [
        Validators.required
      ]
    })
  });

  onSubmit(): void {
    if (this.resetPasswordForm.valid) {
      this._authService.resetPassword(this.resetPasswordForm.getRawValue().email).pipe(
        take(1)
      ).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}