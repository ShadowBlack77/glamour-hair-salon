import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  init(): Observable<void> {
    return new Observable<void>((observer) => {
      console.log('INIT');
      
      observer.next();
      observer.complete();
    });
  }
}