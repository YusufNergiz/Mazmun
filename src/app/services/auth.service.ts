import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false;

  constructor() { }

  checkAuthentication(email: string, password: string) : Observable<boolean> {
    if (email === "admin@gmail.com" && password === 'mazmunadmin2022' ) {
      this.isAuthenticated = true;
      return of(true)
    }
    return of(false)
  }
}
