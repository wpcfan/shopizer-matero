import { Injectable } from '@angular/core';
import * as AuthActions from '@core/+state/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { catchError, exhaustMap, filter, map, of } from 'rxjs';
import * as StoreActions from '../actions';
import { StoreService } from '../services/store.service';

@Injectable()
export class StoreEffects {
  loadCurrenciesWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/stores/create' ||
          /\/stores\/\d+/.test(payload.routerState.url)
      ),
      map(() => StoreActions.loadCurrencies())
    );
  });

  loadLanguagesWhenRoutedToCreateOrEditStore$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/stores/create' ||
          /\/stores\/\d+/.test(payload.routerState.url)
      ),
      map(() => AuthActions.loadLanguages())
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

  constructor(private actions$: Actions, private storeService: StoreService) {}
}
