import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '@shared';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import * as ProductTypeActions from '../actions/product-type.actions';
import { ProductTypeService } from '../services/product-type.service';

@Injectable()
export class ProductTypeEffects {
  list$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductTypeActions.loadProductTypes),
      exhaustMap(({ page, params }) =>
        this.service.list(page, params).pipe(
          map(data => ProductTypeActions.loadProductTypesSuccess({ data })),
          catchError(error => of(ProductTypeActions.loadProductTypesFailure({ error })))
        )
      )
    );
  });

  getById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductTypeActions.getById),
      exhaustMap(({ id, lang }) =>
        this.service.getById(id, lang).pipe(
          map(data => ProductTypeActions.getByIdSuccess({ data })),
          catchError(error => of(ProductTypeActions.getByIdFailure({ error })))
        )
      )
    );
  });

  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductTypeActions.createProductType),
      exhaustMap(({ data }) =>
        this.service.create(data).pipe(
          map(data => ProductTypeActions.createProductTypeSuccess({ data })),
          catchError(error => of(ProductTypeActions.createProductTypeFailure({ error })))
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductTypeActions.updateProductType),
      exhaustMap(({ id, data, lang }) =>
        this.service.update(id, data, lang).pipe(
          map(data => ProductTypeActions.updateProductTypeSuccess({ data })),
          catchError(error => of(ProductTypeActions.updateProductTypeFailure({ error })))
        )
      )
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductTypeActions.deleteProductType),
      exhaustMap(({ id }) =>
        this.service.delete(id).pipe(
          map(() => ProductTypeActions.deleteProductTypeSuccess()),
          catchError(error => of(ProductTypeActions.deleteProductTypeFailure({ error })))
        )
      )
    );
  });

  deleteSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductTypeActions.deleteProductTypeSuccess),
        tap(() => this.router.navigate(['/product-types', 'list']))
      );
    },
    { dispatch: false }
  );

  createSuccessAndRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ProductTypeActions.createProductTypeSuccess),
        tap(({ data }) =>
          this.router.navigate(['/product-types', 'update', data.id], {
            queryParams: { lang: this.local.get('settings').language },
          })
        )
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: ProductTypeService,
    private router: Router,
    private local: LocalStorageService
  ) {}
}
