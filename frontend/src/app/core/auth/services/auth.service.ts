import { Inject, inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, switchMap, take, tap } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { ENV_CONFIG, EnvConfig } from "../../env/env.tokens";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _router: Router = inject(Router);

  readonly user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  constructor(@Inject(ENV_CONFIG) private readonly _envConfig: EnvConfig) {}

  init(): Observable<void> {
    return new Observable<void>((observer) => {
      this._httpClient.get(`${this._envConfig.backendUrl}/auth/profile`, { withCredentials: true }).pipe(
        take(1),
        map((data: any) => {
          return data.content;
        })
      ).subscribe({
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

  signIn(SignInDto: any): Observable<any> {
    return this._httpClient.post(`${this._envConfig.backendUrl}/auth/sign-in`, SignInDto, { withCredentials: true }).pipe(
      take(1),
      switchMap(() => {
        return this.profile().pipe(
          take(1),
          tap((user) => {
            this.user$.next(user);
          })
        );
      })
    );
  }

  signUp(signUpDto: any): Observable<any> { 
    return this._httpClient.post(`${this._envConfig.backendUrl}/auth/sign-up`, signUpDto);
  }

  signOut(): void {
    this._httpClient.post(`${this._envConfig.backendUrl}/auth/sign-out`, {}, { withCredentials: true }).pipe(
      take(1)
    ).subscribe({
      next: () => {
        this.user$.next(undefined);
        this._router.navigateByUrl('/');
      }
    });
  }

  resetPassword(email: string): Observable<{ content: string }> {
    return this._httpClient.post<{ content: string }>(`${this._envConfig.backendUrl}/auth/reset-password`, { email });
  }

  private profile(): Observable<any> {
    return this._httpClient.get(`${this._envConfig.backendUrl}/auth/profile`, { withCredentials: true }).pipe(
      take(1),
      map((data: any) => {
        return data.content;
      })
    );
  }
}