import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '@shared';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as ProductAttributeActions from '../actions/product-attribute.actions';
import { ProductAttributeService } from '../services/product-attribute.service';

@Injectable()
export class ProductAttributeEffects {
  list$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductAttributeActions.loadProductAttributes),
      exhaustMap(({ productId, page }) =>
        this.service.list(productId, page).pipe(
          map(data => ProductAttributeActions.loadProductAttributesSuccess({ data })),
          catchError(error => of(ProductAttributeActions.loadProductAttributesFailure({ error })))
        )
      )
    );
  });

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductAttributeActions.getById),
      exhaustMap(({ productId, attributeId, lang }) =>
        this.service.getById(productId, attributeId, lang).pipe(
          map(data => ProductAttributeActions.getByIdSuccess({ data })),
          catchError(error => of(ProductAttributeActions.getByIdFailure({ error })))
        )
      )
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductAttributeActions.createProductAttribute),
      exhaustMap(({ productId, data }) =>
        this.service.create(productId, data).pipe(
          map(data => ProductAttributeActions.createProductAttributeSuccess({ data })),
          catchError(error => of(ProductAttributeActions.createProductAttributeFailure({ error })))
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductAttributeActions.updateProductAttribute),
      exhaustMap(({ productId, attributeId, data, lang }) =>
        this.service.update(productId, attributeId, data, lang).pipe(
          map(data => ProductAttributeActions.updateProductAttributeSuccess({ data })),
          catchError(error => of(ProductAttributeActions.updateProductAttributeFailure({ error })))
        )
      )
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductAttributeActions.deleteProductAttribute),
      exhaustMap(({ productId, id }) =>
        this.service.delete(productId, id).pipe(
          map(() => ProductAttributeActions.deleteProductAttributeSuccess()),
          catchError(error => of(ProductAttributeActions.deleteProductAttributeFailure({ error })))
        )
      )
    );
  });

  deleteSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductAttributeActions.deleteProductAttributeSuccess),
        tap(() => this.router.navigate(['/products', 'attributes', 'list']))
      );
    },
    { dispatch: false }
  );

  createSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductAttributeActions.createProductAttributeSuccess),
        tap(({ data }) =>
          this.router.navigate(['/products', 'attributes', 'update', data.id], {
            queryParams: this.local.get('settings').language,
          })
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: ProductAttributeService,
    private router: Router,
    private local: LocalStorageService
  ) {}
}
