import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as SettingActions from '@core/+state/actions/setting.actions';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-translate',
  template: `
    <button mat-icon-button class="matero-toolbar-button" [matMenuTriggerFor]="menu">
      <mat-icon>translate</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let lang of langs | keyvalue" (click)="useLanguage(lang.key)">
        <span>{{ lang.value }}</span>
      </button>
    </mat-menu>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TranslateComponent {
  langs = {
    en: 'English',
    zh: '中文简体',
  };

  constructor(private translate: TranslateService, private store: Store) {
    translate.addLangs(['en', 'zh']);
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.store.dispatch(SettingActions.setLanguage({ language }));
  }
}
