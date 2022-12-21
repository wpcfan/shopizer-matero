import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProductOptionValueEffects } from './product-option-value.effects';

describe('ProductOptionValueEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductOptionValueEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductOptionValueEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ProductOptionValueEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
