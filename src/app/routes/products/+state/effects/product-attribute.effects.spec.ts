import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { ProductAttributeEffects } from './product-attribute.effects';

describe('ProductAttributeEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductAttributeEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductAttributeEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(ProductAttributeEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
