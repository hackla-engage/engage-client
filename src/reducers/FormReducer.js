import {
  AGENDA_ITEM_RECEIVED,
  FORM_RESET,
  FORM_SAVE,
  FORM_SUBMITTED,
  CAPTCHA_VERIFIED,
  FORM_EDITING,
  TOKEN_SUBMIT,
  FORM_COMPLETE,
} from '../actions/Form';

export const defaultFormState = {
  // AgendaItem generated
  Committee: '',
  Id: 0,
  Pro: 0,
  AgendaItemId: 0,
  Recommendations: [],
  Summary: '',
  Title: '',
  // user generated
  content: '',
  email: '',
  firstName: '',
  lastName: '',
  zipcode: 90401,
  token: null,
  submitted: false,
  businessOwner: false,
  childSchool: false,
  homeOwner: false,
  resident: false,
  school: false,
  works: false,
  editing: true,
  complete: {},
};

export default function(state = defaultFormState, action) {
  switch (action.type) {
    case AGENDA_ITEM_RECEIVED:
      return Object.assign({}, state, {
        Title: action.payload.Title,
        Recommendations: action.payload.Recommendations,
        Summary: action.payload.Summary,
        Id: action.payload.Id,
        Pro: action.payload.Pro,
        Committee: action.payload.Committee,
        AgendaItemId: action.payload.AgendaItemId,
      });
    case FORM_SAVE:
      return Object.assign({}, state, {
        committee: action.payload.committee,
        content: action.payload.content,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        zipcode: action.payload.zipcode,
        businessOwner: action.payload.businessOwner,
        homeOwner: action.payload.homeOwner,
        resident: action.payload.resident,
        works: action.payload.works,
        school: action.payload.school,
        childSchool: action.payload.childSchool,
        editing: false,
      });
    case FORM_EDITING:
      return Object.assign({}, state, { editing: action.payload });
    case TOKEN_SUBMIT:
      return Object.assign({}, state, { token: action.payload });
    case FORM_SUBMITTED:
      return Object.assign({}, defaultFormState, { submitted: true });
    case FORM_COMPLETE:
      return Object.assign({}, state, {
        complete: action.payload,
        editing: false,
      });
    case FORM_RESET:
      return defaultFormState;
    case CAPTCHA_VERIFIED:
      return Object.assign({}, state, {
        token: action.payload,
      });
    default:
      return state;
  }
}
