import * as fromProductAttribute from '../reducers/product-attribute.reducer';
import { selectProductAttributeState } from './product-attribute.selectors';

describe('ProductAttribute Selectors', () => {
  it('should select the feature state', () => {
    const result = selectProductAttributeState({
      [fromProductAttribute.productAttributeFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
