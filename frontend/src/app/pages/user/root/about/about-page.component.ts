import { animate, state, style, transition, trigger } from "@angular/animations";
import { NgOptimizedImage } from "@angular/common";
import { AfterViewInit, Component, signal, WritableSignal } from "@angular/core";
import { InViewportDirective } from "@glamour/shared";

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  imports: [
    NgOptimizedImage,
    InViewportDirective
  ],
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
    trigger('fade-in-info', [
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
    trigger('fade-in-section-one', [
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
    trigger('fade-in-section-two', [
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
  ]
})
export class AboutPageComponent implements AfterViewInit {

  readonly heroState: WritableSignal<string> = signal('hidden');
  readonly infoState: WritableSignal<string> = signal('hidden');
  readonly sectionOneState: WritableSignal<string> = signal('hidden');
  readonly sectionTwoState: WritableSignal<string> = signal('hidden');

  ngAfterViewInit(): void {
    this.heroState.set('show');
    this.infoState.set('show');
  }

  sectionOneInView(): void {
    this.sectionOneState.set('show');
  }

  sectionTwoInView(): void {
    this.sectionTwoState.set('show');
  }
}