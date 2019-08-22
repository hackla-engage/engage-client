import { HOSTNAME, agent } from '../engage_client';

// agendaItem should be
// {Title: 'x', Recommendations: 'y', Summary: 'z', Id: 'a', Pro: 0/1/2}
export const AGENDA_ITEM_RECEIVED = 'AGENDA_ITEM_RECEIVED';
export const FORM_RESET = 'FORM_RESET';
export const FORM_SAVE = 'FORM_SAVE';
export const CAPTCHA_VERIFIED = 'CAPTCHA_VERIFIED';
export const FORM_SUBMITTED = 'FORM_SUBMITTED';
export const TOKEN_SUBMIT = 'TOKEN_SUBMIT';
export const FORM_EDITING = 'FORM_EDITING';
export const FORM_COMPLETE = 'FORM_COMPLETE';

export const agendaItemReceived = agendaItem => ({
  type: AGENDA_ITEM_RECEIVED,
  payload: agendaItem,
});

export const resetForm = () => ({
  type: FORM_RESET,
  payload: null,
});

export const completeForm = values => ({
  type: FORM_COMPLETE,
  payload: values,
});

export const saveForm = values => ({
  type: FORM_SAVE,
  payload: values,
});

export const editingForm = value => ({
  type: FORM_EDITING,
  payload: value,
});

export const submitToken = value => ({
  type: TOKEN_SUBMIT,
  payload: value,
});

export const formSubmitted = success => ({
  type: FORM_SUBMITTED,
  payload: success,
});

/**
 * Used by confirmation
 * @values = {
      committee: 'Santa Monica City Council',
      ag_item: row id for agenda item, not agendaId,
      token: token from reCaptcha,
      content: comment content,
      firstName: first name text,
      lastName: last name text,
      zipcode: integer value for zipcode of user if exists,
      pro: whether comment is pro=1,con=0,need_more_info=2,
      email: email text value,
 * }
 */
export const submitForm = token => (dispatch, getState) => {
  const { Form } = getState();
  const values = {
    committee: Form.Committee,
    ag_item: Form.Id,
    token,
    content: Form.content,
    email: Form.email,
    first_name: Form.firstName,
    last_name: Form.lastName,
    zipcode: Form.zipcode,
    resident: Form.resident,
    home_owner: Form.homeOwner,
    business_owner: Form.businessOwner,
    works: Form.works,
    child_school: Form.childSchool,
    school: Form.school,
    pro: Form.Pro,
  };
  agent
    .post(`${HOSTNAME}/add/message/`)
    .withCredentials()
    .set('Content-Type', 'application/json')
    .send(values)
    .then(res => {
      dispatch(formSubmitted(true));
    })
    .catch(err => {
      console.log('ERR SENDING FORM', err);
    });
};

export const verifiedCaptcha = token => dispatch => {
  dispatch(submitToken(token));
};
