import { LOCATION_INITIALIZED } from '@angular/common';
import { Injectable, Injector } from '@angular/core';
import * as SettingsActions from '@core/+state/actions/setting.actions';
import { initialState } from '@core/+state/reducers/setting.reducer';
import { PublicService } from '@core/authentication';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TranslateLangService {
  constructor(
    private injector: Injector,
    private translate: TranslateService,
    private store: Store,
    private publicService: PublicService
  ) {}

  load() {
    return new Promise<void>(resolve => {
      const locationInitialized = this.injector.get(LOCATION_INITIALIZED, Promise.resolve());
      locationInitialized.then(async () => {
        const languages = await firstValueFrom(this.publicService.languages());
        let defaultLang = 'en';
        const browserLang = navigator.language;
        const browserLangArr = browserLang.split('-');
        if (browserLangArr.length > 1) {
          const lang = browserLangArr[0];
          if (languages.find(x => x.code === lang)) {
            defaultLang = lang;
            this.store.dispatch(SettingsActions.setLanguage({ language: defaultLang }));
          }
        }
        const localLang =
          JSON.parse(localStorage.getItem('settings') || '{}').language || initialState.language;
        const localLangArr = localLang.split('-');
        if (localLangArr.length > 1) {
          const lang_1 = localLangArr[0];
          if (languages.find(x_1 => x_1.code === lang_1)) {
            defaultLang = lang_1;
          }
        }
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
