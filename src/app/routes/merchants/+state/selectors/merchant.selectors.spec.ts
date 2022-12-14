import * as fromStore from '../reducers/merchant.reducer';
import { selectMerchantState } from './merchant.selectors';

describe('Store Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMerchantState({
      [fromStore.merchantFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
