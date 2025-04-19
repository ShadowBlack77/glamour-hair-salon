import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "@glamour/core";
import { take } from "rxjs";

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class SignUpFormComponent {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  signUpForm: FormGroup = new FormGroup({
    username: new FormControl({
      value: '',
      disabled: false
    }, {
      nonNullable: true,
      validators: [
        Validators.required
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
        Validators.required
      ]
    })
  })

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this._authService.signUp(this.signUpForm.getRawValue()).pipe(
        take(1)
      ).subscribe({
        next: () => {
          this._router.navigate(['/auth/sign-in']);
        }
      })
    }
  }
}