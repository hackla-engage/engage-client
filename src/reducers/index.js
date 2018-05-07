import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import preferenceList from './PreferenceListReducer';
import PreferenceSelected from './PreferenceSelectedReducer';
import Form from "./FormReducer";
import TagsRequestReducer from './TagsRequestReducer';
import agendas from '../ducks/agendas';

const rootReducer = combineReducers({
  router,
  preferenceList,
  PreferenceSelected,
  Form,
  TagsRequestReducer,
  agendas
});

export default rootReducer;
