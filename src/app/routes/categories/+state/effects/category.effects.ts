import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as AuthActions from '@core/+state/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import * as CategoryActions from '../actions/category.actions';
import { CategoryService } from '../services/category.service';

@Injectable()
export class CategoryEffects {
  list$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      exhaustMap(({ page, params }) =>
        this.categoryService.list(page, params).pipe(
          map(data => CategoryActions.loadCategoriesSuccess({ data })),
          catchError(error => of(CategoryActions.loadCategoriesFailure({ error })))
        )
      )
    );
  });

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.getById),
      exhaustMap(({ id }) =>
        this.categoryService.getById(id).pipe(
          map(data => CategoryActions.getByIdSuccess({ data })),
          catchError(error => of(CategoryActions.getByIdFailure({ error })))
        )
      )
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.createCategory),
      exhaustMap(({ data }) =>
        this.categoryService.create(data).pipe(
          map(data => CategoryActions.createCategorySuccess({ data })),
          catchError(error => of(CategoryActions.createCategoryFailure({ error })))
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.updateCategory),
      exhaustMap(({ id, data }) =>
        this.categoryService.update(id, data).pipe(
          map(data => CategoryActions.updateCategorySuccess({ data })),
          catchError(error => of(CategoryActions.updateCategoryFailure({ error })))
        )
      )
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      exhaustMap(({ id }) =>
        this.categoryService.delete(id).pipe(
          map(() => CategoryActions.deleteCategorySuccess()),
          catchError(error => of(CategoryActions.deleteCategoryFailure({ error })))
        )
      )
    );
  });

  deleteSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CategoryActions.deleteCategorySuccess),
        tap(() => this.router.navigate(['/categories', 'list']))
      );
    },
    { dispatch: false }
  );

  loadAll$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.loadAll),
      exhaustMap(() =>
        this.categoryService.allCategories().pipe(
          map(data => CategoryActions.loadAllSuccess({ data })),
          catchError(error => of(CategoryActions.loadAllFailure({ error })))
        )
      )
    );
  });

  loadAllCategoriesWhenRoutedToCreateOrEditCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/categories/create' ||
          /\/categories\/update\/\w+/.test(payload.routerState.url)
      ),
      map(() => CategoryActions.loadAll())
    );
  });

  loadStoreLanguagesWhenRoutedToCreateOrEditCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/categories/create' ||
          /\/categories\/update\/\d+/.test(payload.routerState.url)
      ),
      map(() => AuthActions.loadStoreLanguages())
    );
  });

  loadStoresWhenRoutedToCreateOrEditCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(
        ({ payload }) =>
          payload.routerState.url === '/categories/create' ||
          /\/categories\/update\/\d+/.test(payload.routerState.url)
      ),
      map(() => AuthActions.loadStores())
    );
  });

  constructor(
    private actions$: Actions,
    private categoryService: CategoryService,
    private router: Router
  ) {}
}
