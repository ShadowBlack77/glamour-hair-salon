import { Component } from "@angular/core";
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SignInFormComponent {

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
      console.log(this.signInForm.getRawValue());
    }
  }
}