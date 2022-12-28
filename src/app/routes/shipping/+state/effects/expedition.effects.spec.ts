import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ExpeditionEffects } from './expedition.effects';

describe('ExpeditionEffects', () => {
  let actions$: Observable<any>;
  let effects: ExpeditionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExpeditionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ExpeditionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
