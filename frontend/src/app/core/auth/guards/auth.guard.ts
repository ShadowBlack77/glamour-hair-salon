import { inject, Injectable, OnDestroy } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { map, Observable, Subject, take } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  canActivate(): Observable<boolean> {
    return this._authService.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          this._router.navigate(['/']);

          return false;
        }

        return true;
      })
    );
  }
}