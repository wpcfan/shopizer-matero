import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProductVariantEffects } from './product-variant.effects';

describe('ProductVariantEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductVariantEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductVariantEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ProductVariantEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
