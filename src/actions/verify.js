import { HOSTNAME, agent } from '../engage_client';

export const VERIFIED = 'VERIFIED';

export const verified = verification => ({
  type: VERIFIED,
  payload: verification,
});

export const verify = (email, id, code, type) => dispatch => {
  agent
    .post(`${HOSTNAME}/verify/`)
    .send({
      email,
      id,
      code,
      type,
    })
    .then(res => {
      dispatch(verified(res.body));
    })
    .catch(err => {
      console.log(`Error: ${err}`);
    });
};
