import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { take } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { passwordStrengthValidator } from "@lib/shared/validators";

@Component({
  selector: 'lib-register-form',
  templateUrl: './register-form.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    CommonModule
  ]
})
export class RegisterFormComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  isFormSubmitted: WritableSignal<boolean> = signal(false);
  registerError: WritableSignal<string | undefined> = signal(undefined);

  registerForm: FormGroup = new FormGroup({
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
    if (this.registerForm.valid) {
      this.isFormSubmitted.set(true);
      this.registerError.set(undefined);

      this._authService.register(this.registerForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this.isFormSubmitted.set(true);
          
          this._router.navigate(['/auth/sign-in']);
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.registerError.set(errorResponse.error.message);
          this.isFormSubmitted.set(false);
        }
      })
    }
  }
}