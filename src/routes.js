import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './component/Landing.jsx';
import Header from './component/Header.jsx';
import Footer from './component/Footer.jsx';
import PreferenceList from './container/PreferenceList.jsx';
import FeedContainer from './container/FeedContainer.jsx';
import SignIn from './component/SignIn.jsx'
import Faq from './component/Faq.jsx'
import FormContainer from "./container/FormContainer.jsx"
const Routes = () => {
  return (
    <div>
      <Route component={ Header } />
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route path="/preference" component={PreferenceList} />
        <Route path="/feed" component={ FeedContainer } />
        <Route path="/signin" component={SignIn} />
        <Route path="/faq" component={Faq} />
        <Route path="/form" component={FormContainer} />
      </Switch>
      <Route component={ Footer } />
    </div>
  );
};

export default Routes;
