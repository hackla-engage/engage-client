import { VERIFIED } from '../actions/verify';

export const defaultState = {
  verified: false,
};
export default function (state = defaultState, action) {
  switch (action.type) {
  case VERIFIED:
    return state;
  default:
    return state;
  }
}
