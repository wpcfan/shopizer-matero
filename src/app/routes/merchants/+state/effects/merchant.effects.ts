import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as AuthActions from '@core/+state/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import * as StoreActions from '../actions';
import { MerchantService } from '../services/merchant.service';

@Injectable()
export class MerchantEffects {
  loadCountriesWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/stores/create' ||
          /\/stores\/update\/\d+/.test(payload.routerState.url)
      ),
      map(() => AuthActions.loadCountries())
    );
  });

  loadLanguagesWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/stores/create' ||
          /\/stores\/update\/\d+/.test(payload.routerState.url)
      ),
      map(() => AuthActions.loadLanguages())
    );
  });

  loadCurrenciesWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/stores/create' ||
          /\/stores\/update\/\d+/.test(payload.routerState.url)
      ),
      map(() => StoreActions.loadCurrencies())
    );
  });

  loadMeasuresWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/stores/create' ||
          /\/stores\/\d+/.test(payload.routerState.url)
      ),
      map(() => StoreActions.loadMeasures())
    );
  });

  loadRetailersWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/stores/list' ||
          payload.routerState.url === '/stores/create' ||
          /\/stores\/\d+/.test(payload.routerState.url)
      ),
      map(() => StoreActions.loadRetailers())
    );
  });

  loadStores$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.loadMerchants),
      exhaustMap(({ page, params }) =>
        this.service.merchants(page, params).pipe(
          map(data => StoreActions.loadMerchantsSuccess({ data })),
          catchError(error => of(StoreActions.loadMerchantsFailure({ error })))
        )
      )
    );
  });

  loadCurrencies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.loadCurrencies),
      exhaustMap(() =>
        this.service.currencies().pipe(
          map(data => StoreActions.loadCurrenciesSuccess({ data })),
          catchError(error => of(StoreActions.loadCurrenciesFailure({ error })))
        )
      )
    );
  });

  loadMeasures$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.loadMeasures),
      exhaustMap(() =>
        this.service.measures().pipe(
          map(data => StoreActions.loadMeasuresSuccess({ data })),
          catchError(error => of(StoreActions.loadMeasuresFailure({ error })))
        )
      )
    );
  });

  loadRetailers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.loadRetailers),
      exhaustMap(() =>
        this.service.retailers().pipe(
          map(data => StoreActions.loadRetailersSuccess({ data })),
          catchError(error => of(StoreActions.loadRetailersFailure({ error })))
        )
      )
    );
  });

  createStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.createMerchant),
      exhaustMap(({ data }) =>
        this.service.create(data).pipe(
          map(store => StoreActions.createMerchantSuccess({ data: store })),
          catchError(error => of(StoreActions.createMerchantFailure({ error })))
        )
      )
    );
  });

  createStoreSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(StoreActions.createMerchantSuccess),
        tap(({ data }) => this.router.navigate(['stores', data.code]))
      );
    },
    { dispatch: false }
  );

  selectStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.selectMerchant),
      exhaustMap(({ code }) =>
        this.service.getBy(code).pipe(
          map(store => StoreActions.selectMerchantSuccess({ data: store })),
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              return of(StoreActions.selectMerchantFailure({ error: error.error.message }));
            }
            console.log(error);

            return of(StoreActions.selectMerchantFailure({ error: 'Unknown Error' }));
          })
        )
      )
    );
  });

  updateStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.updateMerchant),
      exhaustMap(({ code, data }) =>
        this.service.update(code, data).pipe(
          map(store => StoreActions.updateMerchantSuccess({ data: store })),
          catchError(error => of(StoreActions.updateMerchantFailure({ error })))
        )
      )
    );
  });

  updateStoreSuccessAndMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(StoreActions.updateMerchantSuccess),
        tap(() => this.snack.open('Store updated successfully', 'OK'))
      );
    },
    { dispatch: false }
  );

  deleteStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.deleteMerchant),
      exhaustMap(({ code }) =>
        this.service.delete(code).pipe(
          map(() => StoreActions.deleteMerchantSuccess()),
          catchError(error => of(StoreActions.deleteMerchantFailure({ error })))
        )
      )
    );
  });

  deleteSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(StoreActions.deleteMerchantSuccess),
        tap(() => {
          this.snack.open('Store deleted successfully', 'OK');
          this.router.navigate(['stores', 'list']);
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
