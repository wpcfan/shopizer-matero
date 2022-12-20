import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProductTypeEffects } from './product-type.effects';

describe('ProductTypeEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductTypeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductTypeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ProductTypeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
