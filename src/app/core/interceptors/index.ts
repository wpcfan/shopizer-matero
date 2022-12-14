import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor } from './base-url-interceptor';

// import { SanctumInterceptor } from './sanctum-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { ShopizerLanguageInterceptor } from './shopizer-lang-interceptor';
import { ShopizerStoreInterceptor } from './shopizer-store-interceptor';
import { ShopizerTokenInterceptor } from './shopizer-token-interceptor';

// export * from './sanctum-interceptor';
export * from './base-url-interceptor';
export * from './default-interceptor';
export * from './error-interceptor';
export * from './logging-interceptor';
export * from './noop-interceptor';
export * from './settings-interceptor';
export * from './shopizer-lang-interceptor';
export * from './shopizer-store-interceptor';
export * from './shopizer-token-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  // { provide: HTTP_INTERCEPTORS, useClass: SanctumInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: SettingsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ShopizerLanguageInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ShopizerStoreInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ShopizerTokenInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
];
