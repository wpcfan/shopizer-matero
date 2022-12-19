import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as BrandsActions from '../actions/brand.actions';
import { BrandService } from '../services/brand.service';

@Injectable()
export class BrandEffects {
  list$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BrandsActions.loadBrands),
      exhaustMap(({ page, params }) =>
        this.service.list(page, params).pipe(
          map(data => BrandsActions.loadBrandsSuccess({ data })),
          catchError(error => of(BrandsActions.loadBrandsFailure({ error })))
        )
      )
    );
  });

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BrandsActions.getById),
      exhaustMap(({ id, lang }) =>
        this.service.getById(id, lang).pipe(
          map(data => BrandsActions.getByIdSuccess({ data })),
          catchError(error => of(BrandsActions.getByIdFailure({ error })))
        )
      )
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BrandsActions.createBrand),
      exhaustMap(({ data }) =>
        this.service.create(data).pipe(
          map(data => BrandsActions.createBrandSuccess({ data })),
          catchError(error => of(BrandsActions.createBrandFailure({ error })))
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BrandsActions.updateBrand),
      exhaustMap(({ id, data, lang }) =>
        this.service.update(id, data, lang).pipe(
          map(data => BrandsActions.updateBrandSuccess({ data })),
          catchError(error => of(BrandsActions.updateBrandFailure({ error })))
        )
      )
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BrandsActions.deleteBrand),
      exhaustMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => BrandsActions.deleteBrandSuccess()),
          catchError(error => of(BrandsActions.deleteBrandFailure({ error })))
        )
      )
    );
  });

  deleteSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BrandsActions.deleteBrandSuccess),
        tap(() => this.router.navigate(['/brands', 'list']))
      );
    },
    { dispatch: false }
  );

  createSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(BrandsActions.createBrandSuccess),
        tap(({ data }) => this.router.navigate(['/brands', 'update', data.id]))
      );
    },
    { dispatch: false }
  );

  constructor(private actions$: Actions, private service: BrandService, private router: Router) {}
}
