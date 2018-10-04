import reducer, { initialState } from '../TagsRequestReducer';
import { REQUEST_TAGS } from '../../ducks/preference';

describe('TagsRequestReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle REQUEST_TAGS', () => {
    const payload = {};
    const requestTags = {
      type: REQUEST_TAGS,
      payload,
    };
    expect(reducer(initialState, requestTags)).toEqual({
      ...initialState,
      tags: payload,
    });
  });
});
