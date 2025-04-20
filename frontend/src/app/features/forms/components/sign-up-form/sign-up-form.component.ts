import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@glamour/core";
import { take } from "rxjs";
import { passwordStrengthValidator } from "../../validators/password-strength.validator";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ]
})
export class SignUpFormComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  isFormSubmitted: WritableSignal<boolean> = signal(false);
  signUpError: WritableSignal<string | undefined> = signal(undefined);

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    }),
    email: new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.email,
        Validators.required
      ]
    }),
    password: new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        passwordStrengthValidator()
      ]
    })
  })

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.isFormSubmitted.set(true);
      this.signUpError.set(undefined);

      this._authService.signUp(this.signUpForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.isFormSubmitted.set(true);
          
          this._router.navigate(['/auth/sign-in']);
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.signUpError.set(errorResponse.error.message);
          this.isFormSubmitted.set(false);
        }
      })
    }
  }
}