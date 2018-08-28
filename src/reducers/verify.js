import { VERIFIED } from '../actions/verify';

const defaultState = {
  verified: false,
};
export default function (state = defaultState, action) {
  switch (action.type) {
  case VERIFIED:
    console.log(action.payload);
    return state;
  default:
    return state;
  }
}
