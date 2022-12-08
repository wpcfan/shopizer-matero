import { Component, OnInit } from '@angular/core';
import * as AuthActions from '@core/+state/actions';
import * as fromAuth from '@core/+state/selectors/auth.selectors';
import { Profile } from '@models';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-panel',
  template: `
    <div
      class="matero-user-panel"
      fxLayout="column"
      fxLayoutAlign="center center"
      *ngIf="profile$ | async as user"
    >
      <mat-icon class="matero-avatar-icon" width="32">account_circle</mat-icon>
      <h4 class="matero-user-panel-name">{{ user.firstName }} {{ user.lastName }}</h4>
      <h5 class="matero-user-panel-email">{{ user.emailAddress }}</h5>
      <div class="matero-user-panel-icons">
        <button mat-icon-button routerLink="/profile/overview">
          <mat-icon class="icon-18">account_circle</mat-icon>
        </button>
        <button mat-icon-button routerLink="/profile/settings">
          <mat-icon class="icon-18">settings</mat-icon>
        </button>
        <button mat-icon-button (click)="logout()">
          <mat-icon class="icon-18">exit_to_app</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent implements OnInit {
  profile$: Observable<Profile | undefined>;

  constructor(private store: Store) {
    this.profile$ = this.store.select(fromAuth.selectProfile);
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.loadProfile());
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
