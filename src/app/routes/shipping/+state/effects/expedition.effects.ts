import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs';
import * as ExpeditionActions from '../actions/expedition.actions';
import { ShippingService } from '../services/shipping.service';

@Injectable()
export class ExpeditionEffects {
  loadExpedition$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExpeditionActions.loadExpedition),
      exhaustMap(() =>
        this.service.getExpedition().pipe(
          map(data => ExpeditionActions.loadExpeditionSuccess({ data })),
          catchError(error => [ExpeditionActions.loadExpeditionFailure({ error })])
        )
      )
    );
  });

  update$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExpeditionActions.updateExpedition),
      exhaustMap(({ data }) =>
        this.service.updateExpedition(data).pipe(
          map(() => ExpeditionActions.updateExpeditionSuccess({ data })),
          catchError(error => [ExpeditionActions.updateExpeditionFailure({ error })])
        )
      )
    );
  });

  constructor(private actions$: Actions, private service: ShippingService) {}
}
