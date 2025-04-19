import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { SignUpFormComponent } from "@glamour/features";

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  imports: [
    SignUpFormComponent,
    NgOptimizedImage
  ]
})
export class SignUpPageComponent {}