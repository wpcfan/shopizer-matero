import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProductOptionEffects } from './product-option.effects';

describe('ProductOptionEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductOptionEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductOptionEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ProductOptionEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
