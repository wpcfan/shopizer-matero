import * as fromExpedition from '../reducers/expedition.reducer';
import { selectExpeditionState } from './expedition.selectors';

describe('Expedition Selectors', () => {
  it('should select the feature state', () => {
    const result = selectExpeditionState({
      [fromExpedition.expeditionFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
