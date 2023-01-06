import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '@shared';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as ProductActions from '../actions/product.actions';
import { ProductService } from '../services/product.service';

@Injectable()
export class ProductEffects {
  list$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      exhaustMap(({ page, params }) =>
        this.service.list(page, params).pipe(
          map(data => ProductActions.loadProductsSuccess({ data })),
          catchError(error => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    );
  });

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getById),
      exhaustMap(({ id }) =>
        this.service.getById(id).pipe(
          map(data => ProductActions.getByIdSuccess({ data })),
          catchError(error => of(ProductActions.getByIdFailure({ error })))
        )
      )
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.createProduct),
      exhaustMap(({ data }) =>
        this.service.create(data).pipe(
          map(data => ProductActions.createProductSuccess({ data })),
          catchError(error => of(ProductActions.createProductFailure({ error })))
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      exhaustMap(({ id, data }) =>
        this.service.update(id, data).pipe(
          map(data => ProductActions.updateProductSuccess({ data })),
          catchError(error => of(ProductActions.updateProductFailure({ error })))
        )
      )
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      exhaustMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ProductActions.deleteProductSuccess()),
          catchError(error => of(ProductActions.deleteProductFailure({ error })))
        )
      )
    );
  });

  deleteSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductActions.deleteProductSuccess),
        tap(() => this.router.navigate(['/product', 'list']))
      );
    },
    { dispatch: false }
  );

  createSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductActions.createProductSuccess),
        tap(({ data }) =>
          this.router.navigate(['/product', 'update', data.id], {
            queryParams: this.local.get('settings').language,
          })
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: ProductService,
    private router: Router,
    private local: LocalStorageService
  ) {}
}
