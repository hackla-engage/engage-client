import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import counter from './counter';
import preferenceList from './PreferenceListReducer';

const rootReducer = combineReducers({
  counter,
  router,
  preferenceList
});

export default rootReducer;
