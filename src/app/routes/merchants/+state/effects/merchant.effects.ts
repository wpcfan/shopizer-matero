import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as AuthActions from '@core/+state/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import * as MerchantActions from '../actions';
import { MerchantService } from '../services/merchant.service';

@Injectable()
export class MerchantEffects {
  loadCountriesWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/merchants/create' ||
          /\/merchants\/update\/\w+/.test(payload.routerState.url)
      ),
      map(() => AuthActions.loadCountries())
    );
  });

  loadLanguagesWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/merchants/create' ||
          /\/merchants\/update\/\w+/.test(payload.routerState.url)
      ),
      map(() => AuthActions.loadLanguages())
    );
  });

  loadCurrenciesWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/merchants/create' ||
          /\/merchants\/update\/\w+/.test(payload.routerState.url)
      ),
      map(() => MerchantActions.loadCurrencies())
    );
  });

  loadMeasuresWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/merchants/create' ||
          /\/merchants\/update\/\w+/.test(payload.routerState.url)
      ),
      map(() => MerchantActions.loadMeasures())
    );
  });

  loadRetailersWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/merchants/list' ||
          payload.routerState.url === '/merchants/create' ||
          /\/merchants\/update\/\w+/.test(payload.routerState.url)
      ),
      map(() => MerchantActions.loadRetailers())
    );
  });

  loadStores$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MerchantActions.loadMerchants),
      exhaustMap(({ page, params }) =>
        this.service.merchants(page, params).pipe(
          map(data => MerchantActions.loadMerchantsSuccess({ data })),
          catchError(error => of(MerchantActions.loadMerchantsFailure({ error })))
        )
      )
    );
  });

  loadCurrencies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MerchantActions.loadCurrencies),
      exhaustMap(() =>
        this.service.currencies().pipe(
          map(data => MerchantActions.loadCurrenciesSuccess({ data })),
          catchError(error => of(MerchantActions.loadCurrenciesFailure({ error })))
        )
      )
    );
  });

  loadMeasures$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MerchantActions.loadMeasures),
      exhaustMap(() =>
        this.service.measures().pipe(
          map(data => MerchantActions.loadMeasuresSuccess({ data })),
          catchError(error => of(MerchantActions.loadMeasuresFailure({ error })))
        )
      )
    );
  });

  loadRetailers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MerchantActions.loadRetailers),
      exhaustMap(() =>
        this.service.retailers().pipe(
          map(data => MerchantActions.loadRetailersSuccess({ data })),
          catchError(error => of(MerchantActions.loadRetailersFailure({ error })))
        )
      )
    );
  });

  createStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MerchantActions.createMerchant),
      exhaustMap(({ data }) =>
        this.service.create(data).pipe(
          map(store => MerchantActions.createMerchantSuccess({ data: store })),
          catchError(error => of(MerchantActions.createMerchantFailure({ error })))
        )
      )
    );
  });

  createStoreSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MerchantActions.createMerchantSuccess),
        tap(({ data }) => this.router.navigate(['merchants', data.code]))
      );
    },
    { dispatch: false }
  );

  selectStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MerchantActions.getByCode),
      exhaustMap(({ code }) =>
        this.service.getBy(code).pipe(
          map(store => MerchantActions.getByCodeSuccess({ data: store })),
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              return of(MerchantActions.getByCodeFailure({ error: error.error.message }));
            }
            console.log(error);

            return of(MerchantActions.getByCodeFailure({ error: 'Unknown Error' }));
          })
        )
      )
    );
  });

  updateStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MerchantActions.updateMerchant),
      exhaustMap(({ code, data }) =>
        this.service.update(code, data).pipe(
          map(store => MerchantActions.updateMerchantSuccess({ data: store })),
          catchError(error => of(MerchantActions.updateMerchantFailure({ error })))
        )
      )
    );
  });

  updateStoreSuccessAndMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MerchantActions.updateMerchantSuccess),
        tap(() => this.snack.open('Store updated successfully', 'OK'))
      );
    },
    { dispatch: false }
  );

  deleteStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MerchantActions.deleteMerchant),
      exhaustMap(({ code }) =>
        this.service.delete(code).pipe(
          map(() => MerchantActions.deleteMerchantSuccess()),
          catchError(error => of(MerchantActions.deleteMerchantFailure({ error })))
        )
      )
    );
  });

  deleteSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MerchantActions.deleteMerchantSuccess),
        tap(() => {
          this.snack.open('Merchant deleted successfully', 'OK', { duration: 2000 });
          this.router.navigate(['merchants', 'list']);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: MerchantService,
    private router: Router,
    private snack: MatSnackBar
  ) {}
}
