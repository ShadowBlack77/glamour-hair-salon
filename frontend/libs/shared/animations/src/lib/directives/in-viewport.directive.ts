import { Directive, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output } from "@angular/core";

@Directive({
  selector: '[appInViewport]'
})
export class InViewportDirective implements OnInit, OnDestroy {

  @Output() appInViewport = new EventEmitter<void>();

  private _observer$: IntersectionObserver | null = null;
  private readonly _elementRef: ElementRef = inject(ElementRef);

  ngOnInit(): void {
    this._observer$ = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          
          if (this._observer$) {
            this.appInViewport.emit();
            this._observer$.unobserve(this._elementRef.nativeElement);
          }
        }
      },
      {
        threshold: 0.1
      }
    );

    this._observer$.observe(this._elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this._observer$) {
      this._observer$.disconnect();
      this._observer$ = null;
    }
  }
}