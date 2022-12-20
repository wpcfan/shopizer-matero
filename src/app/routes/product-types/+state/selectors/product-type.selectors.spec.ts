import * as fromProductType from '../reducers/product-type.reducer';
import { selectProductTypeState } from './product-type.selectors';

describe('ProductType Selectors', () => {
  it('should select the feature state', () => {
    const result = selectProductTypeState({
      [fromProductType.productTypeFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
