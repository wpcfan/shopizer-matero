import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '@shared';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as ProductVariantActions from '../actions/product-variant.actions';
import { ProductVariantService } from '../services/product-variant.service';

@Injectable()
export class ProductVariantEffects {
  list$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductVariantActions.loadProductVariants),
      exhaustMap(({ page }) =>
        this.service.list(page).pipe(
          map(data => ProductVariantActions.loadProductVariantsSuccess({ data })),
          catchError(error => of(ProductVariantActions.loadProductVariantsFailure({ error })))
        )
      )
    );
  });

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductVariantActions.getById),
      exhaustMap(({ variantId, lang }) =>
        this.service.getById(variantId, lang).pipe(
          map(data => ProductVariantActions.getByIdSuccess({ data })),
          catchError(error => of(ProductVariantActions.getByIdFailure({ error })))
        )
      )
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductVariantActions.createProductVariant),
      exhaustMap(({ data }) =>
        this.service.create(data).pipe(
          map(data => ProductVariantActions.createProductVariantSuccess({ data })),
          catchError(error => of(ProductVariantActions.createProductVariantFailure({ error })))
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductVariantActions.updateProductVariant),
      exhaustMap(({ variantId, data, lang }) =>
        this.service.update(variantId, data, lang).pipe(
          map(data => ProductVariantActions.updateProductVariantSuccess({ data })),
          catchError(error => of(ProductVariantActions.updateProductVariantFailure({ error })))
        )
      )
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductVariantActions.deleteProductVariant),
      exhaustMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ProductVariantActions.deleteProductVariantSuccess()),
          catchError(error => of(ProductVariantActions.deleteProductVariantFailure({ error })))
        )
      )
    );
  });

  deleteSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductVariantActions.deleteProductVariantSuccess),
        tap(() => this.router.navigate(['/products', 'variants', 'list']))
      );
    },
    { dispatch: false }
  );

  createSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductVariantActions.createProductVariantSuccess),
        tap(({ data }) =>
          this.router.navigate(['/products', 'variants', 'update', data.id], {
            queryParams: { lang: this.local.get('settings').language },
          })
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: ProductVariantService,
    private router: Router,
    private local: LocalStorageService
  ) {}
}
