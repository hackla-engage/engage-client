import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import preferenceList from './PreferenceListReducer';
import PreferenceSelected from './PreferenceSelectedReducer';
import Form from "./FormReducer";

const rootReducer = combineReducers({
  counter,
  router,
  preferenceList,
  PreferenceSelected,
  Form
});

export default rootReducer;
