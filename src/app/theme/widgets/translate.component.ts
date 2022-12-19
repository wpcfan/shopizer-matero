import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as AuthActions from '@core/+state/actions';
import * as SettingActions from '@core/+state/actions/setting.actions';
import * as fromProfile from '@core/+state/selectors/profile.selectors';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { tap } from 'rxjs';
@Component({
  selector: 'app-translate',
  template: `
    <button mat-icon-button class="matero-toolbar-button" [matMenuTriggerFor]="menu">
      <mat-icon>translate</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let lang of langs$ | async" (click)="useLanguage(lang.code)">
        <span>{{ 'language.' + lang.code | translate }}</span>
      </button>
    </mat-menu>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslateComponent {
  langs$ = this.store.select(fromProfile.selectStoreLanguages).pipe(
    tap(langs => {
      this.translate.addLangs(langs.map(lang => lang.code));
    })
  );

  constructor(private translate: TranslateService, private store: Store) {
    this.store.dispatch(AuthActions.loadStoreLanguages());
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.store.dispatch(SettingActions.setLanguage({ language }));
  }
}
