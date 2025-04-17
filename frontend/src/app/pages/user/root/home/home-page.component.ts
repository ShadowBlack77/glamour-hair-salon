import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, signal, WritableSignal } from "@angular/core";
import { ProductsFeaturedListComponent } from "@glamour/features";
import { animate, state, style, transition, trigger } from '@angular/animations';
import { InViewportDirective } from "@glamour/shared";
import { interval, map, takeWhile } from "rxjs";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  imports: [
    ProductsFeaturedListComponent,
    InViewportDirective
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('fade-in-hero', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s ease-in')
      ])
    ]),
    trigger('fade-in-services', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s 0.25s ease-in')
      ])
    ]),
    trigger('fade-in-booking', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s .25s ease-in')
      ])
    ]),
    trigger('fade-in-products', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s .25s ease-in')
      ])
    ]),
    trigger('fade-in-information', [
      state('hidden', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('hidden => show', [
        animate('.5s .25s ease-in')
      ])
    ])
  ]
})
export class HomePageComponent implements AfterViewInit {

  readonly heroState: WritableSignal<string> = signal<string>('hidden');
  readonly servicesState: WritableSignal<string> = signal<string>('hidden');
  readonly bookingState: WritableSignal<string> = signal<string>('hidden');
  readonly productsState: WritableSignal<string> = signal<string>('hidden');
  readonly informationState: WritableSignal<string> = signal<string>('hidden');

  readonly clientsCount: WritableSignal<number> = signal(0);
  readonly salonsCount: WritableSignal<number> = signal(0);

  ngAfterViewInit(): void {
    this.heroState.set('show');
    this.servicesState.set('show');
  }

  bookingInView(): void {
    this.bookingState.set('show');
  }

  productsInView(): void {
    this.productsState.set('show');
  }

  informationInView(): void {
    this.informationState.set('show');
    this.animateCount(this.clientsCount, 30, 2000);
    this.animateCount(this.salonsCount, 15, 2000);
  }

  private animateCount(signal: WritableSignal<number>, target: number, duration: number): void {
    const steps = 60;
    const increment = target / steps;
    const intervalTime = duration / steps;

    interval(intervalTime)
      .pipe(
        map((i) => Math.round((i + 1) * increment)),
        takeWhile((value) => value <= target)
      )
      .subscribe((value) => signal.set(value));
  }
}