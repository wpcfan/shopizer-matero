import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '@shared';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as ProductOptionValueActions from '../actions/product-option-value.actions';
import { ProductOptionValueService } from '../services/product-option-value.service';

@Injectable()
export class ProductOptionValueEffects {
  list$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductOptionValueActions.loadProductOptionValues),
      exhaustMap(({ page, params }) =>
        this.service.list(page, params).pipe(
          map(data => ProductOptionValueActions.loadProductOptionValuesSuccess({ data })),
          catchError(error =>
            of(ProductOptionValueActions.loadProductOptionValuesFailure({ error }))
          )
        )
      )
    );
  });

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductOptionValueActions.getById),
      exhaustMap(({ id, lang }) =>
        this.service.getById(id, lang).pipe(
          map(data => ProductOptionValueActions.getByIdSuccess({ data })),
          catchError(error => of(ProductOptionValueActions.getByIdFailure({ error })))
        )
      )
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductOptionValueActions.createProductOptionValue),
      exhaustMap(({ data }) =>
        this.service.create(data).pipe(
          map(data => ProductOptionValueActions.createProductOptionValueSuccess({ data })),
          catchError(error =>
            of(ProductOptionValueActions.createProductOptionValueFailure({ error }))
          )
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductOptionValueActions.updateProductOptionValue),
      exhaustMap(({ id, data, lang }) =>
        this.service.update(id, data, lang).pipe(
          map(data => ProductOptionValueActions.updateProductOptionValueSuccess({ data })),
          catchError(error =>
            of(ProductOptionValueActions.updateProductOptionValueFailure({ error }))
          )
        )
      )
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductOptionValueActions.deleteProductOptionValue),
      exhaustMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ProductOptionValueActions.deleteProductOptionValueSuccess()),
          catchError(error =>
            of(ProductOptionValueActions.deleteProductOptionValueFailure({ error }))
          )
        )
      )
    );
  });

  deleteSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductOptionValueActions.deleteProductOptionValueSuccess),
        tap(() => this.router.navigate(['/product-options', 'values', 'list']))
      );
    },
    { dispatch: false }
  );

  createSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductOptionValueActions.createProductOptionValueSuccess),
        tap(({ data }) =>
          this.router.navigate(['/product-options', 'values', 'update', data.id], {
            queryParams: this.local.get('settings').language,
          })
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: ProductOptionValueService,
    private router: Router,
    private local: LocalStorageService
  ) {}
}
