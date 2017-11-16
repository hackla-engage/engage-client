import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './component/Landing.jsx';
import Header from './component/Header.jsx';
import CounterContainer from './container/CounterContainer.jsx';

const Routes = () => {
	return (
		<div>
      <Route component={ Header } />
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route path="/redux" component={CounterContainer} />
      </Switch>
    </div>
	);
};

export default Routes;
