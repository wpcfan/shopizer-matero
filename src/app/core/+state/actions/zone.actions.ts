import { Zone } from '@models';
import { createAction, props } from '@ngrx/store';

export const loadZones = createAction('[Profile] Load Zones', props<{ countryCode: string }>());

export const loadZonesSuccess = createAction(
  '[Profile] Load Zones Success',
  props<{ data: Zone[] }>()
);

export const loadZonesFailure = createAction(
  '[Profile] Load Zones Failure',
  props<{ error: string }>()
);
