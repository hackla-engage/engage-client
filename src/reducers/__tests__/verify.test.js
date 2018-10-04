import reducer, { defaultState } from '../verify';
import { VERIFIED } from '../../actions/verify';

describe('verify reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle VERIFIED', () => {
    const payload = {};
    const requestTags = {
      type: VERIFIED,
      payload,
    };
    expect(reducer(defaultState, requestTags)).toEqual(defaultState);
  });
});
