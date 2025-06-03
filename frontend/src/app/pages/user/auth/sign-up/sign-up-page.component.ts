import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { RegisterFormComponent } from "@lib/auth";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  imports: [
    RegisterFormComponent,
    NgOptimizedImage
  ]
})
export class SignUpPageComponent {}