// This ducks is a combined file for {actionTypes, actions, reducer} tuples for convenience only
// https://github.com/erikras/ducks-modular-redux

import { getJSON } from '../engage_client.js';
import store from '../store/configureStore.dev';
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
  committee: '',
  agendaLoading: false,
  agendaLoadError: {
    error: false,
    content: '',
  },
  agendaResults: [],
  next: '',
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_AGENDAS:
      const { agendaList, committee, agendaResults } = action.payload;
      if (!agendaList || agendaList.length === 0) return;

      const next = action.next;

      const agendaItems = agendaList.reduce(
        (acc, agenda) => {
          if (acc[agenda.id]) {
            console.log('duplicate agenda id', agenda.id);
          }
          acc[agenda.id] = agenda;
          return acc;
        },
        { ...state.agendaItems }
      );

      const agendaIDs = Object.keys(agendaItems);
      const agendaIDsSortedByTime = agendaIDs.sort((a, b) => {
        const timeA = agendaItems[a].meeting_time;
        const timeB = agendaItems[b].meeting_time;

        if (timeA > timeB) return -1;
        else if (timeA < timeB) return 1;
        return 0;
      });

      return {
        ...state,
        agendaItems,
        committee,
        agendaIDs: agendaIDsSortedByTime,
        agendaLoading: false,
        agendaResults,
        next,
      };
    case REQUEST_LOADING:
      return {
        ...state,
        agendaLoading: true,
      };
    default:
      return state;
  }
}

// Action Creators
export function requestAgendas(requestURL) {
  return dispatch => {
    dispatch({
      type: REQUEST_LOADING,
    });
    getJSON(requestURL)
      .then(json => {
        if (!json || !json.results || json.results.length === 0) {
          return;
        }

        const agendaList = json.results.reduce(
          (acc, result) => [...acc, ...result.items],
          []
        );
        console.log(json.results);
        const agendaResults = json.results;
        const nextArray = json.next.split('/');
        const nextAgendaURL = `${nextArray[nextArray.length - 2]}/${
          nextArray[nextArray.length - 1]
        }`;

        dispatch({
          type: REQUEST_AGENDAS,
          payload: {
            agendaList,
            agendaResults,
            committee: json.results[0].committee.name,
          },
          next: nextAgendaURL,
        });
      })
      .catch(err => console.log(err));
  };
}
