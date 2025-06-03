import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, signal, WritableSignal } from "@angular/core";
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { take } from "rxjs";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'lib-login-form',
  templateUrl: './login-form.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    CommonModule
  ]
})
export class LoginFormComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  isFormSubmitted: WritableSignal<boolean> = signal(false);
  loginError: WritableSignal<string | undefined> = signal(undefined);

  loginForm: FormGroup = new FormGroup({
    email: new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    password: new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.required
      ]
    })
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginError.set(undefined);
      this.isFormSubmitted.set(true);

      this._authService.login(this.loginForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: (user) => {
          this.isFormSubmitted.set(false);

          if (user!.role === 'user') {
            this._router.navigate(['/']);

            return;
          }

          this._router.navigate(['/admin/dashboard']);
          
          return;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.isFormSubmitted.set(false);
          this.loginError.set(errorResponse.error.message);
        }
      });
    }
  }
}