import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import preferenceList from '../ducks/preference.js';
import Form from './FormReducer';
import TagsRequestReducer from './TagsRequestReducer';
import verify from './verify';
import agendas from '../ducks/agendas';
import mailChimp from './MailChimpSubReducer';
import feedState from '../ducks/feedState';

const rootReducer = combineReducers({
  router,
  preferenceList,
  Form,
  TagsRequestReducer,
  verify,
  agendas,
  mailChimp,
  feedState,
});

export default rootReducer;
