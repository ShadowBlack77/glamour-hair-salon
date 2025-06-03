import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard {

  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);

  canActivate(): Observable<boolean> {
    return this._authService.user$.pipe(
      map((user) => {
        if (!user || user.role !== 'admin') {
          return true;
        }

        this._router.navigateByUrl('/admin/dashboard');

        return false;
      })
    )
  }
}