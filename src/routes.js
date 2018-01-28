import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './component/Landing.jsx';
import Header from './component/Header.jsx';
import Footer from './component/Footer.jsx';
import CounterContainer from './container/CounterContainer.jsx';
import PreferenceList from './container/PreferenceList.jsx';

const Routes = () => {
	return (
		<div>
      <Route component={ Header } />
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route path="/redux" component={CounterContainer} />
        <Route path="/preference" component={PreferenceList} />
      </Switch>
      <Route component={ Footer } />
    </div>
	);
};

export default Routes;
