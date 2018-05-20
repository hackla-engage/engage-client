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
            const agendaList = action.payload.agendaList;
            if(!agendaList || agendaList.length === 0) return;

            const agendaItems = agendaList.reduce((acc, agenda)=>{
                if(acc[agenda.id]){
                    console.log('duplicate agenda id', agenda.id);
                }
                acc[agenda.id] = agenda;
                return acc;
            }, {...state.agendaItems})

            const agendaIDs = Object.keys(agendaItems);
            const agendaIDsSortedByTime = agendaIDs.sort((a, b)=>{
                let timeA = agendaItems[a].meeting_time
                let timeB = agendaItems[b].meeting_time

                if(timeA > timeB) return -1;
                else if(timeA < timeB) return 1;
                else return 0;
            })

            return {
                ...state,
                agendaItems,
                agendaIDs: agendaIDsSortedByTime,
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

                dispatch({
                    type: REQUEST_AGENDAS,
                    payload: {
                        agendaList,
                    }
                })
            })
    }
}