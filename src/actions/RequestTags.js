import { REQUEST_TAGS } from '../ducks/preference.js';
import { getJSON } from '../engage_client.js';
/**
 * Make GET /tags request to Engage API
 *
 * getJSON returns a promise. Once the async HTTP request completes,
 * our promise resolves, and we then() get the json data from it and
 * create our action, which the function then returns.
 */
export function requestTags() {
  return getJSON('tags').then(json => {
    console.log('requestTags json: ', json);
    return {
      type: REQUEST_TAGS,
      payload: json,
    };
  });
}
