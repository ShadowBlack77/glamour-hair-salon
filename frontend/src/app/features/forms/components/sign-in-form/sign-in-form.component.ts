import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, inject, signal, WritableSignal } from "@angular/core";
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@glamour/core";
import { take } from "rxjs";

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    CommonModule
  ]
})
export class SignInFormComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  isFormSubmitted: WritableSignal<boolean> = signal(false);
  signInError: WritableSignal<string | undefined> = signal(undefined);

  signInForm: FormGroup = new FormGroup({
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
    if (this.signInForm.valid) {
      this.signInError.set(undefined);
      this.isFormSubmitted.set(true);

      this._authService.signIn(this.signInForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: (user) => {
          this.isFormSubmitted.set(false);

          if (user.role === 'user') {
            this._router.navigate(['/']);

            return;
          }

          this._router.navigate(['/admin/dashboard']);
          
          return;
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.isFormSubmitted.set(false);
          this.signInError.set(errorResponse.error.message);
        }
      });
    }
  }
}