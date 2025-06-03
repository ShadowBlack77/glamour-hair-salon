import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { LoginFormComponent } from "@lib/auth";

@Component({
  selector: 'lib-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  imports: [
    LoginFormComponent,
    NgOptimizedImage,
  ]
})
export class SignInPageComponent {}