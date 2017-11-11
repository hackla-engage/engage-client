import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import Landing from './component/Landing.jsx';
import CounterContainer from './containers/CounterContainer.jsx';

export default () => (
  <App>
    <Switch>
      <Route path="/counterContainer" component={CounterContainer} />
      <Route path="/" ccomponents={Landing} />
    </Switch>
  </App>
);
