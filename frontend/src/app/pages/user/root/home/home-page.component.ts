import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    NgOptimizedImage
  ]
})
export class HomePageComponent {}