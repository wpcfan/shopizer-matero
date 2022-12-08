import * as fromSetting from '../reducers/setting.reducer';
import { selectSettingState } from './setting.selectors';

describe('Setting Selectors', () => {
  it('should select the feature state', () => {
    const result = selectSettingState({
      [fromSetting.settingFeatureKey]: {},
    });

    expect(result).toEqual(fromSetting.initialState);
  });
});
