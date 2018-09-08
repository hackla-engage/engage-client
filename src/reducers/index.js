import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import preferenceList from '../ducks/preference.js';
import Form from './FormReducer';
import TagsRequestReducer from './TagsRequestReducer';
import verify from './verify';
import agendas from '../ducks/agendas';

const rootReducer = combineReducers({
  router,
  preferenceList,
  Form,
  TagsRequestReducer,
  verify,
  agendas,
});

export default rootReducer;
