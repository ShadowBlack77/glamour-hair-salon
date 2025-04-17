import { Inject, inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, take } from "rxjs";
import { User } from "../models/user.model";
import { HttpClient } from "@angular/common/http";
import { ENV_CONFIG, EnvConfig } from "../../env/env.tokens";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient: HttpClient = inject(HttpClient);

  readonly user$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  constructor(@Inject(ENV_CONFIG) private readonly _envConfig: EnvConfig) {}

  init(): Observable<void> {
    return new Observable<void>((observer) => {
      this._httpClient.get(`${this._envConfig.backendUrl}/auth/profile`, { withCredentials: true }).pipe(
        take(1)
      ).subscribe({
        next: (data: any) => {
          this.user$.next(data.user);

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
}