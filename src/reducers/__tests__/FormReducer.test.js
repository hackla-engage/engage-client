import reducer, { defaultFormState } from '../FormReducer';
import {
  AGENDA_ITEM_RECEIVED,
  FORM_RESET,
  FORM_SAVE,
  FORM_SUBMITTED,
  // CAPTCHA_VERIFIED,
  FORM_EDITING,
  TOKEN_SUBMIT,
  FORM_COMPLETE,
} from '../../actions/Form';
// import expect from 'expect';

describe('FormReducer reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(defaultFormState);
  });

  it('should handle AGENDA_ITEM_RECEIVED', () => {
    const payload = {
      Title: 'foo',
      Recommendations: [],
      Summary: 'some summary',
      Id: 5,
      Pro: 7,
      Committee: 'some committee',
      AgendaItemId: 10,
    };
    const agendaItemReceived = {
      type: AGENDA_ITEM_RECEIVED,
      payload,
    };
    expect(reducer(defaultFormState, agendaItemReceived)).toEqual({
      ...defaultFormState,
      ...payload,
    });
  });

  it('should handle FORM_RESET', () => {
    const payload = null;
    const formReset = {
      type: FORM_RESET,
      payload,
    };
    expect(reducer(defaultFormState, formReset)).toEqual(defaultFormState);
  });

  it('should handle FORM_SAVE', () => {
    const payload = {
      committee: 'some committee',
      content: 'foo',
      email: 'baz@bar.com',
      firstName: 'Bar',
      lastName: 'Baz',
      zipcode: 12345,
      businessOwner: true,
      homeOwner: true,
      resident: true,
      works: true,
      school: true,
      childSchool: true,
      editing: false,
    };
    const formSave = {
      type: FORM_SAVE,
      payload,
    };
    expect(reducer(defaultFormState, formSave)).toEqual({
      ...defaultFormState,
      ...payload,
    });
  });

  it('should handle FORM_SUBMITTED', () => {
    const payload = true;
    const formSubmitted = {
      type: FORM_SUBMITTED,
      payload,
    };
    expect(reducer(defaultFormState, formSubmitted)).toEqual({
      ...defaultFormState,
      submitted: true,
    });
  });

  it('should handle FORM_EDITING', () => {
    const payload = true;
    const formEditing = {
      type: FORM_EDITING,
      payload,
    };
    expect(reducer(defaultFormState, formEditing)).toEqual({
      ...defaultFormState,
      editing: true,
    });
  });

  it('should handle TOKEN_SUBMIT', () => {
    const payload = 'sometoken';
    const tokenSubmit = {
      type: TOKEN_SUBMIT,
      payload,
    };
    expect(reducer(defaultFormState, tokenSubmit)).toEqual({
      ...defaultFormState,
      token: 'sometoken',
    });
  });

  it('should handle FORM_COMPLETE', () => {
    const payload = {};
    const formComplete = {
      type: FORM_COMPLETE,
      payload,
    };
    expect(reducer(defaultFormState, formComplete)).toEqual({
      ...defaultFormState,
      complete: payload,
      editing: false,
    });
  });
});
