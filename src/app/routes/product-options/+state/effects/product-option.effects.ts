import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '@shared';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as ProductOptionActions from '../actions/product-option.actions';
import { ProductOptionService } from '../services/product-option.service';

@Injectable()
export class ProductOptionEffects {
  list$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductOptionActions.loadProductOptions),
      exhaustMap(({ page, params }) =>
        this.service.list(page, params).pipe(
          map(data => ProductOptionActions.loadProductOptionsSuccess({ data })),
          catchError(error => of(ProductOptionActions.loadProductOptionsFailure({ error })))
        )
      )
    );
  });

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductOptionActions.getById),
      exhaustMap(({ id, lang }) =>
        this.service.getById(id, lang).pipe(
          map(data => ProductOptionActions.getByIdSuccess({ data })),
          catchError(error => of(ProductOptionActions.getByIdFailure({ error })))
        )
      )
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductOptionActions.createProductOption),
      exhaustMap(({ data }) =>
        this.service.create(data).pipe(
          map(data => ProductOptionActions.createProductOptionSuccess({ data })),
          catchError(error => of(ProductOptionActions.createProductOptionFailure({ error })))
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductOptionActions.updateProductOption),
      exhaustMap(({ id, data, lang }) =>
        this.service.update(id, data, lang).pipe(
          map(data => ProductOptionActions.updateProductOptionSuccess({ data })),
          catchError(error => of(ProductOptionActions.updateProductOptionFailure({ error })))
        )
      )
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductOptionActions.deleteProductOption),
      exhaustMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ProductOptionActions.deleteProductOptionSuccess()),
          catchError(error => of(ProductOptionActions.deleteProductOptionFailure({ error })))
        )
      )
    );
  });

  deleteSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductOptionActions.deleteProductOptionSuccess),
        tap(() => this.router.navigate(['/product-options', 'options', 'list']))
      );
    },
    { dispatch: false }
  );

  createSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductOptionActions.createProductOptionSuccess),
        tap(({ data }) =>
          this.router.navigate(['/product-options', 'options', 'update', data.id], {
            queryParams: this.local.get('settings').language,
          })
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: ProductOptionService,
    private router: Router,
    private local: LocalStorageService
  ) {}
}
