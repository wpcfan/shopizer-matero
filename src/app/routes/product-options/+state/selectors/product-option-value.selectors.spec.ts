import * as fromProductOptionValue from '../reducers/product-option-value.reducer';
import { selectProductOptionValueState } from './product-option-value.selectors';

describe('ProductOptionValue Selectors', () => {
  it('should select the feature state', () => {
    const result = selectProductOptionValueState({
      [fromProductOptionValue.productOptionValueFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
