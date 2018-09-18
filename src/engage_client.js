/**
 * Interact with the Engage API
 */
import superagent from 'superagent';
import { getResource } from './async';

export const agent = superagent.agent();

let HOST = 'https://backend.engage.town/api';
if (process.env.NODE_ENV === 'devsrv') {
  HOST = 'http://localhost:8000/api';
}
export const HOSTNAME = HOST;

// Headers for basic GET request which returns JSON
const HEADERS = new Headers({
  'Content-Type': 'json',
  Accept: 'json',
});

/**
 * getJSON
 * Use this for basic GET requests to get JSON
 * from the Engage API.
 *
 * @param endpointUrl - API endpoint. Appended to the HOST const
 * to create the complete URI.
 *  example: '/tags'
 */
export function getJSON(endpointUrl) {
  return getResource([], HOST, endpointUrl);
}
