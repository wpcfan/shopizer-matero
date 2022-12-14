import * as fromMerchant from '../reducers/merchant.reducer';
import { selectMerchantState } from './merchant.selectors';

describe('Merchant Selectors', () => {
  it('should select the feature state', () => {
    const result = selectMerchantState({
      [fromMerchant.merchantFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
