const SET_POSITION = 'SET_POSITION';
const RESET_POSITION = 'RESET_POSITION';

const initialState = {
  position: 0,
};
//reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_POSITION:
      return {
        ...state,
        position: action.payload,
      };
    case RESET_POSITION:
      return {
        ...state,
        position: 0,
      };
    default:
      return state;
  }
}

//actions
export function resetPosition() {
  return { type: RESET_POSITION };
}
export function setPosition(position) {
  return {
    type: SET_POSITION,
    payload: position,
  };
}
