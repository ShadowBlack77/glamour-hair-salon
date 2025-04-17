import { Component, inject, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { ProductsState } from "../../store/products.reducer";
import { BehaviorSubject, Subject, takeUntil } from "rxjs";
import { selectAllFeaturedProducts } from "../../store/products.selector";
import { CommonModule, CurrencyPipe, NgOptimizedImage } from "@angular/common";
import { Product } from "../../model/product.model";

@Component({
  selector: 'app-products-featured-list',
  templateUrl: './products-featured-list.component.html',
  imports: [
    CommonModule,
    CurrencyPipe,
    NgOptimizedImage
  ]
})
export class ProductsFeaturedListComponent implements OnInit, OnDestroy {

  private readonly _store: Store<ProductsState> = inject(Store);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);

  ngOnInit(): void {
    this._store.select(selectAllFeaturedProducts).pipe(
      takeUntil(this._destroy$)
    ).subscribe({
      next: (featuredProducts) => {
        this.products$.next(featuredProducts.data ?? []);
      }, 
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}