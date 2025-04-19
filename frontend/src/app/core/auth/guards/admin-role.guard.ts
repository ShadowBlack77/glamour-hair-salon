import { inject, Injectable } from "@angular/core";
import { map, Observable, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  canActivate(): Observable<boolean> {
    return this._authService.user$.pipe(
      take(1),
      map((user) => {
        if (!user || user.role !== 'admin') {
          this._router.navigate(['/']);

          return false;
        }

        return true;
      })
    )
  }
}