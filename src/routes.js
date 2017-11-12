import React from 'react';
import { Switch, Route } from 'react-router';
import App from './container/App.jsx';
import Landing from './component/Landing.jsx';
import CounterContainer from './container/CounterContainer.jsx';

export default () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/redux" component={CounterContainer} />
  </Switch>
);