import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanActivate,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  checkAuth(): Promise<boolean> {
    return this.authService
      .checkAuth()
      .then(auth => {
        if (auth.data.userDetails) {
        sessionStorage.setItem('userDetails', JSON.stringify(auth.data.userDetails));
        }
        return true;
      })
      .catch(err => {
        sessionStorage.clear();
        this.router.navigate(['login']);
        return false;
      });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkAuth();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> | boolean {
    return this.checkAuth();
  }
}
