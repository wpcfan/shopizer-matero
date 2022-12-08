import { Component } from '@angular/core';
import * as AuthActions from '@core/+state/actions';
import * as fromAuth from '@core/+state/selectors/auth.selectors';
import { Profile } from '@models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user',
  template: `
    <ng-container *ngIf="profile$ | async as user">
      <button
        class="matero-toolbar-button matero-avatar-button"
        mat-button
        [matMenuTriggerFor]="menu"
      >
        <mat-icon class="matero-avatar-icon">account_circle</mat-icon>
        <span class="matero-username" fxHide.lt-sm>{{ user.firstName }}</span>
      </button>

      <mat-menu #menu="matMenu">
        <button routerLink="/profile/overview" mat-menu-item>
          <mat-icon>account_circle</mat-icon>
          <span>{{ 'user.profile' | translate }}</span>
        </button>
        <button routerLink="/profile/settings" mat-menu-item>
          <mat-icon>settings</mat-icon>
          <span>{{ 'user.settings' | translate }}</span>
        </button>
        <button mat-menu-item (click)="logout()">
          <mat-icon>exit_to_app</mat-icon>
          <span>{{ 'user.logout' | translate }}</span>
        </button>
      </mat-menu>
    </ng-container>
  `,
})
export class UserComponent {
  profile$: Observable<Profile | undefined>;

  constructor(private store: Store) {
    this.profile$ = this.store.select(fromAuth.selectProfile);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
