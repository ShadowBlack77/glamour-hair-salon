import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { AuthService } from "../../auth/services/auth.service";
import { Subject, takeUntil } from "rxjs";
import { User } from "../../auth/models/user.model";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-auth-header-segment',
  templateUrl: './auth-header-segment.component.html',
  styleUrl: './auth-header-segment.component.css',
  imports: [
    RouterModule,
  ]
})
export class AuthHeaderSegmentComponent implements OnInit, OnDestroy {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _destroy$: Subject<void> = new Subject<void>();

  readonly user: WritableSignal<User | undefined> = signal(undefined);

  ngOnInit(): void {
    this._authService.user$.pipe(
      takeUntil(this._destroy$)
    ).subscribe({
      next: (data) => {
        this.user.set(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  signOut(): void {
    this._authService.signOut();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}