import { HOSTNAME } from '../engage_client';
import request from 'superagent';

// agendaItem should be
// {Title: 'x', Recommendations: 'y', Summary: 'z', Id: 'a', Pro: 0/1/2}
export const AGENDA_ITEM_RECEIVED = 'AGENDA_ITEM_RECEIVED';
export const FORM_RESET = 'FORM_RESET';
export const FORM_SAVE = 'FORM_SAVE';
export const CAPTCHA_VERIFIED = 'CAPTCHA_VERIFIED';
export const FORM_SUBMITTED = 'FORM_SUBMITTED';
export const FORM_EDITING = 'FORM_EDITING';
export const agendaItemReceived = agendaItem => ({
  type: AGENDA_ITEM_RECEIVED,
  payload: agendaItem,
});

export const resetForm = () => ({
  type: FORM_RESET,
  payload: null,
});

export const saveForm = values => ({
  type: FORM_SAVE,
  payload: values,
});
export const editForm = () => ({
  type: FORM_EDITING,
  payload: true,
});
export const verifiedCaptcha = token => ({
  type: CAPTCHA_VERIFIED,
  payload: token,
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
export const submitForm = () => (dispatch, getState) => {
  const { Form } = getState();
  const values = {
    committee: Form.Committee,
    ag_item: Form.Id,
    token: Form.token,
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
  request
    .agent()
    .post(`${HOSTNAME}/add/message/`)
    .set('Content-Type', 'application/json')
    .send(values)
    .then((res) => {
      if (res.body.success) {
        dispatch(formSubmitted(true));
      }
    })
    .catch((err) => {
      console.log('ERR SENDING FORM', err);
    });
};
