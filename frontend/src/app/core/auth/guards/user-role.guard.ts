import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard {

  canActivate(): Observable<boolean> {
    return of(true);
  }
}