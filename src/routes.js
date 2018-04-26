import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './component/Landing.jsx';
import Header from './component/Header.jsx';
import Footer from './component/Footer.jsx';
import PreferenceList from './container/PreferenceList.jsx';
import AgendaFeedContainer from './container/AgendaFeedContainer.jsx';
import SignIn from './component/SignIn.jsx'
import Faq from './component/Faq.jsx'
import TopicsSelectorContainer from './container/TopicsSelectorContainer.jsx'

const Routes = () => {
  return (
    <div>
      <Route component={ Header } />
      <Switch>
        <Route exact path="/" component={ Landing } />
        <Route path="/preference" component={PreferenceList} />
        <Route path="/feed" component={ AgendaFeedContainer } />
        <Route path="/signin" component={SignIn} />
        <Route path="/faq" component={Faq} />
        <Route path="/topics" component={TopicsSelectorContainer} />
      </Switch>
      <Route component={ Footer } />
    </div>
  );
};

export default Routes;
