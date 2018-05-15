"use strict";
/**
 * Interact with the Engage API
 */

import { getResource } from "./async";
import Promise from "bluebird";
import test_data from "./test_data.js"
import { rejects } from "assert";
console.log(test_data)
let HOST = "https://council-tag.herokuapp.com/api";
if (process.env.NODE_ENV === 'devsrv') {
  HOST = "http://localhost:8000/api"
}
// Headers for basic GET request which returns JSON
const HEADERS = new Headers({
  "Content-Type": "json",
  Accept: "json"
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
  console.log(process.env.NODE_ENV)
  if (['production', 'devsrv'].includes(process.env.NODE_ENV) || endpointUrl !== 'agendas') {
    return getResource([], HOST, endpointUrl);
  } else {
    return new Promise(((resolve, reject) => {
      try {
        resolve(test_data);
      } catch(e) {
        reject(e)
      }
    }))
    return Promise.resolve(JSON.parse(test_data))
  }
}
