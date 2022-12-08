import { LOCATION_INITIALIZED } from '@angular/common';
import { Injectable, Injector } from '@angular/core';
import * as SettingsActions from '@core/+state/actions/setting.actions';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
@Injectable({
  providedIn: 'root',
})
export class TranslateLangService {
  constructor(
    private injector: Injector,
    private translate: TranslateService,
    private store: Store
  ) {}

  load() {
    return new Promise<void>(resolve => {
      const locationInitialized = this.injector.get(LOCATION_INITIALIZED, Promise.resolve());
      locationInitialized.then(() => {
        const browserLang = navigator.language;
        const defaultLang = browserLang.match(/en-US|zh-CN|zh-TW/) ? browserLang : 'en-US';

        this.store.dispatch(SettingsActions.setLanguage({ language: defaultLang }));
        this.translate.setDefaultLang(defaultLang);
        this.translate.use(defaultLang).subscribe({
          next: () => console.log(`Successfully initialized '${defaultLang}' language.'`),
          error: () => console.error(`Problem with '${defaultLang}' language initialization.'`),
          complete: () => resolve(),
        });
      });
    });
  }
}
