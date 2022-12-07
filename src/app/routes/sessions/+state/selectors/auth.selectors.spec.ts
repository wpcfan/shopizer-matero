import * as fromAuth from '../reducers';
import { selectAuthFeatureState } from './auth.selectors';

describe('Setting Selectors', () => {
  it('should select the feature state', () => {
    const result = selectAuthFeatureState({
      [fromAuth.authFeatureKey]: fromAuth.initialState,
    });

    expect(result).toEqual(fromAuth.initialState);
  });
});
