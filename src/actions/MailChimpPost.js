import { RSAA } from 'redux-api-middleware';

export const MailChimpSubscribe = data => ({
  [RSAA]: {
    endpoint: 'https://backend.engage.town/api/mailchimp/',
    method: 'POST',
    types: ['SUB_REQUEST', 'SUB_SUCCESS', 'SUB_FAILURE'],
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: data.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: data.first_name,
        LNAME: data.last_name,
      },
    }),
  },
});
