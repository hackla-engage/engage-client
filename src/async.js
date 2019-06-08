/**
 * Helper functions for HTTP requests
 * Generally these should be used to build other functions
 * which are then used to interact with an API.
 */

export function getResource(headers, host, endpointUrl) {
  return fetch(`${host}/${endpointUrl}`, {
    headers,
    mode: 'cors',
    credentials: 'include',
  })
    .then(handleErrors)
    .then(response => response.json());
}

export function handleErrors(response) {
  // TODO: This is not correct. Fix it at some point. OK to leave out
  // while developing.
  // if(!response.ok) {
  // throw Error(response.statusText);
  // }
  return response;
}
