import { REQUEST_TAGS } from '../ducks/preference';

// This is the initial state for our particular slice of the entire state.
export const initialState = {
  tags: [],
};

function TagsRequestReducer(state = initialState, action) {
  switch (action.type) {
  case REQUEST_TAGS:
    // Redux does not let you modify state. You must
    // create a new state object w/the desired changes.
    // This is how you update state. So, we ....
    // Create a new state object which has the payload (which should be json)
    // assigned to the `tags` prop.
    return Object.assign({}, { tags: action.payload });

    // This is necessary in redux. Otherwise, when actions
    // which we dont have a case for get passed to this reducer,
    // the state won't get returned in order that it may be then
    // passed to another reducer.
    default:
      return state;
  }
}

export default TagsRequestReducer;
