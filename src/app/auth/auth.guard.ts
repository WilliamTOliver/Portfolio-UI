import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    return this.authService
      .checkAuth()
      .then((auth) => {
        return true;
      })
      .catch((err) => {
        this.router.navigate(['login']);
        return false;
      });
  }
  canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    return this.authService
      .checkAuth()
      .then((auth) => {
        return true;
      })
      .catch((err) => {
        this.router.navigate(['login']);
        return false;
      });
  }
}
