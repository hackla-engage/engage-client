// This ducks is a combined file for {actionTypes, actions, reducer} tuples for convenience only
// https://github.com/erikras/ducks-modular-redux

import { getJSON } from '../engage_client.js';
/**
 * Make GET /tags request to Engage API
 *
 * getJSON returns a promise. Once the async HTTP request completes,
 * our promise resolves, and we then() get the json data from it and
 * create our action, which the function then returns.
 */

// Actions
const REQUEST_AGENDAS = 'REQUEST_AGENDAS';

// Reducer
export default function reducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_AGENDAS:
            return {
                ...state,
                agendaItems: action.payload,
            };
        default:
            return state;
    }
}

// Action Creators
export function requestAgendas() {
    return (dispatch) => {
        getJSON('agendas')
            .then((json) => {
                console.log('requestAgendas: ', json);
                let firstMeetingAgendas = json.results[0].items;

                dispatch({
                    type: REQUEST_AGENDAS,
                    payload: firstMeetingAgendas,
                })
            })
    }
}