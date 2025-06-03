import { inject, Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProtectGuard {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  canActivate(): Observable<boolean> {
    return this._authService.user$.pipe(
      map((user) => {
        if (!user) {
          this._router.navigateByUrl('/');

          return false;
        }

        return true;
      })
    )
  }
}