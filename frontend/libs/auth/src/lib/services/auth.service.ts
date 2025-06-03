import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map, Observable, switchMap, take, tap } from "rxjs";
import { User } from "../models/user.model";
import { ENV_CONFIG, EnvConfig } from "@lib/core/environments";
import { Response } from "@lib/shared/http";
import { Login } from "../models/login.model";
import { Register } from "../models/register.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _router: Router = inject(Router);
  private readonly _envConfig: EnvConfig = inject(ENV_CONFIG);

  readonly user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  init(): Observable<void> {
    return new Observable<void>((observer) => {
      this.profile().subscribe({
        next: (user) => {
          this.user$.next(user);

          observer.next();
          observer.complete();
        },
        error: () => {
          this.user$.next(undefined);

          observer.next();
          observer.complete();
        }
      })
    });
  }

  login(login: Login): Observable<User | undefined> {
    return this._httpClient.post(`${this._envConfig.backendUrl}/auth/sign-in`, login, { withCredentials: true }).pipe(
      take(1),
      switchMap(() => {
        return this.profile().pipe(
          take(1),
          tap((user) => {
            this.user$.next(user);
          })
        )
      })
    )
  }

  register(register: Register): Observable<unknown> {
    return this._httpClient.post(`${this._envConfig.backendUrl}/auth/sign-up`, register);
  }

  logout(): void {
    this._httpClient.post(`${this._envConfig.backendUrl}/auth/sign-out`, {}, { withCredentials: true }).pipe(
      take(1)
    ).subscribe({
      next: () => {
        this.user$.next(undefined);
        this._router.navigateByUrl('/');
      }
    })
  }

  resetPassword(email: string): Observable<{ content: string }> {
    return this._httpClient.post<{ content: string }>(`${this._envConfig.backendUrl}/auth/reset-password`, { email });
  }

  private profile(): Observable<User | undefined> {
    return this._httpClient.get<Response<User | undefined>>(`${this._envConfig.backendUrl}/auth/profile`, { withCredentials: true }).pipe(
      take(1),
      map((data: Response<User | undefined>) => {
        return data.content;
      })
    )
  }
}