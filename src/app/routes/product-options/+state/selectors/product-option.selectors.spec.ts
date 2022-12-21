import * as fromProductOption from '../reducers/product-option.reducer';
import { selectProductOptionState } from './product-option.selectors';

describe('ProductOption Selectors', () => {
  it('should select the feature state', () => {
    const result = selectProductOptionState({
      [fromProductOption.productOptionFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
