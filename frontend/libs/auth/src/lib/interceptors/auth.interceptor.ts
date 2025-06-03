import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ENV_CONFIG, EnvConfig } from "@lib/core/environments";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  private readonly _env: EnvConfig = inject(ENV_CONFIG);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const modifiedReq = req.clone({
      setHeaders: {
        'x-api-key': this._env.apiKey
      }
    });

    return next.handle(modifiedReq);
  }
  
}