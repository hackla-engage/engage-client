import { MailChimpSubscribe } from '../actions/MailChimpPost';

const initialState = {
  response: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MailChimpSubscribe.SUB_SUCCESS:
      return {
        ...state,
        response: action.payload,
      };

    default:
      return state;
  }
};

export const getResponse = state => state.mailChimp.response;
