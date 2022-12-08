import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import * as fromAuth from '@core/+state/selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticate();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authenticate();
  }

  private authenticate(): Observable<boolean | UrlTree> {
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      map(loggedIn => {
        if (!loggedIn) {
          return this.router.parseUrl('/auth/login');
        }
        return true;
      })
    );
  }
}
