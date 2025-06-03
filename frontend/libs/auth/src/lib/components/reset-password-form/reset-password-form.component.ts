import { CommonModule } from "@angular/common";
import { Component, inject, signal, WritableSignal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { take } from "rxjs";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'lib-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ResetPasswordFormComponent {

  private readonly _authService: AuthService = inject(AuthService);

  readonly isFormSubmitted: WritableSignal<boolean> = signal(false);
  readonly successfullySubmitted: WritableSignal<string | undefined> = signal(undefined);

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
      this.isFormSubmitted.set(true);
      this.successfullySubmitted.set(undefined);

      this._authService.resetPassword(this.resetPasswordForm.getRawValue().email).pipe(
        take(1)
      ).subscribe({
        next: (data) => {
          const { content } = data;
          this.successfullySubmitted.set(content);
          this.isFormSubmitted.set(false);
        },
        error: (err) => {
          console.log(err);
          this.successfullySubmitted.set(undefined);
          this.isFormSubmitted.set(false);
        }
      })
    }
  }
}