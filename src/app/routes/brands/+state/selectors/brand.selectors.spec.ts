import * as fromBrands from '../reducers/brand.reducer';
import { selectBrandState } from './brand.selectors';

describe('Brands Selectors', () => {
  it('should select the feature state', () => {
    const result = selectBrandState({
      [fromBrands.brandFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
