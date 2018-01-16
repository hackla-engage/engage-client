import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import preferenceList from './PreferenceListReducer';
import PreferenceSelected from './PreferenceSelectedReducer';

const rootReducer = combineReducers({
  counter,
  router,
  preferenceList,
  PreferenceSelected
});

export default rootReducer;
