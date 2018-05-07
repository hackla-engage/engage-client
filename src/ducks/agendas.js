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
const REQUEST_LOADING = 'REQUEST_LOADING';

// Reducer
const defaultState = {
    agendaIDs: [],
    agendaItems: {},
    agendaLoading: false,
    agendaLoadError: {
        error: false,
        content: '',
    },
}
export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case REQUEST_AGENDAS:
            return {
                ...state,
                agendaItems: action.payload.agendas,
                agendaIDs: action.payload.agendaIDs,
                agendaLoading: false,
            };
        case REQUEST_LOADING:
            return {
                ...state,
                agendaLoading: true,
            }
        default:
            return state;
    }
}

// Action Creators
export function requestAgendas() {
    return (dispatch) => {
        dispatch({
            type: REQUEST_LOADING
        });
        getJSON('agendas')
            .then((json) => {
                console.log('requestAgendas: ', json);
                if(!json || !json.results || json.results.length === 0){ 
                    return;
                }

                let agendaList = json.results.reduce((acc, result)=>{
                    return [...acc, ...result.items];
                }, [])

                let agendaIDs = agendaList.reduce((acc, agenda)=>{
                    return [...acc, ...agenda.id];
                }, [])

                let agendas = agendaList.reduce((acc, agenda)=>{
                    if(acc[agenda.id]){
                        console.log('duplicate agenda id', agenda.id);
                    }
                    acc[agenda.id] = agenda;
                    return acc;
                }, {})

                dispatch({
                    type: REQUEST_AGENDAS,
                    payload: {
                        agendas,
                        agendaIDs,
                    }
                })
            })
    }
}