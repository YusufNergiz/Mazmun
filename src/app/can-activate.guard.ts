import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { map, Observable, pipe } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UserServiceService } from './services/user-service.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuard implements CanActivate {

  constructor(private authService: AuthService, private userService: UserServiceService, private afAuth: AngularFireAuth, private router: Router) { }
  

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated: any = () => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user?.email === "admin@gmail.com" && user?.uid === "wPGbBYbaTWfVLbnMzJ8D3vVyN992") {
          return true
        }
        else {
          this.router.navigate(['/sign-in'])
          return false
        }
      })
    }
      return isAuthenticated()
}
}
