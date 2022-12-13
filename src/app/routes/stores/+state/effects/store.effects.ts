import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as AuthActions from '@core/+state/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import * as StoreActions from '../actions';
import { StoreService } from '../services/store.service';

@Injectable()
export class StoreEffects {
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
      ofType(StoreActions.loadStores),
      exhaustMap(({ page, params }) =>
        this.storeService.stores(page, params).pipe(
          map(data => StoreActions.loadStoresSuccess({ data })),
          catchError(error => of(StoreActions.loadStoresFailure({ error })))
        )
      )
    );
  });

  loadCurrencies$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.loadCurrencies),
      exhaustMap(() =>
        this.storeService.currencies().pipe(
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
        this.storeService.measures().pipe(
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
        this.storeService.retailers().pipe(
          map(data => StoreActions.loadRetailersSuccess({ data })),
          catchError(error => of(StoreActions.loadRetailersFailure({ error })))
        )
      )
    );
  });

  createStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.createStore),
      exhaustMap(({ data }) =>
        this.storeService.create(data).pipe(
          map(store => StoreActions.createStoreSuccess({ data: store })),
          catchError(error => of(StoreActions.createStoreFailure({ error })))
        )
      )
    );
  });

  createStoreSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(StoreActions.createStoreSuccess),
        tap(({ data }) => this.router.navigate(['stores', data.code]))
      );
    },
    { dispatch: false }
  );

  selectStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.selectMerchant),
      exhaustMap(({ code }) =>
        this.storeService.getByCode(code).pipe(
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
      ofType(StoreActions.updateStore),
      exhaustMap(({ code, data }) =>
        this.storeService.update(code, data).pipe(
          map(store => StoreActions.updateStoreSuccess({ data: store })),
          catchError(error => of(StoreActions.updateStoreFailure({ error })))
        )
      )
    );
  });

  updateStoreSuccessAndMessage$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(StoreActions.updateStoreSuccess),
        tap(() => this.snack.open('Store updated successfully', 'OK'))
      );
    },
    { dispatch: false }
  );

  deleteStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StoreActions.deleteStore),
      exhaustMap(({ code }) =>
        this.storeService.delete(code).pipe(
          map(() => StoreActions.deleteStoreSuccess()),
          catchError(error => of(StoreActions.deleteStoreFailure({ error })))
        )
      )
    );
  });

  deleteSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(StoreActions.deleteStoreSuccess),
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
    private storeService: StoreService,
    private router: Router,
    private snack: MatSnackBar
  ) {}
}
