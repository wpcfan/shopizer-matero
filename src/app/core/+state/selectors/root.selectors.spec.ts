import * as fromSetting from '../reducers/root.reducer';
import { selectTheme } from './root.selectors';

describe('Setting Selectors', () => {
  it('should select the feature state', () => {
    const result = selectTheme(fromSetting.initialState);

    expect(result).toEqual(fromSetting.initialState.theme);
  });
});
