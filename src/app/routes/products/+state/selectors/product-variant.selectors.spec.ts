import * as fromProductVariant from '../reducers/product-variant.reducer';
import { selectProductVariantState } from './product-variant.selectors';

describe('ProductVariant Selectors', () => {
  it('should select the feature state', () => {
    const result = selectProductVariantState({
      [fromProductVariant.productVariantFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
