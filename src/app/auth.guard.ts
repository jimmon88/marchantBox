import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,private router: Router,) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean|UrlTree> | boolean {
    if (localStorage.getItem('userToken') != null)
      return true;
      this.router.navigate(['/login']);
      return false;
    // return this.auth.isAuthenticated$.pipe(
    //   tap(loggedIn => {
    //     if (!loggedIn) {
    //       this.auth.login(state.url);
    //     }
    //   })
    // );
  }

}
