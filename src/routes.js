import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './component/About.jsx';
import Landing from './component/Landing.jsx';
import Header from './component/Header.jsx';
import Footer from './component/Footer.jsx';
import AgendaFeedContainer from './container/AgendaFeedContainer.jsx';
import SignIn from './component/SignIn.jsx';
import Faq from './component/Faq.jsx';
import FormContainer from './container/FormContainer.jsx';
import EmailConfirmation from './component/EmailConfirmation.jsx';

const Routes = () => {
  return (
    <div>
      <Route component={Header} />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/about" component={About} />
        <Route path="/feed" component={AgendaFeedContainer} />
        <Route path="/signin" component={SignIn} />
        <Route path="/faq" component={Faq} />
        <Route path="/form" component={FormContainer} />
        <Route path="/emailConfirmation" component={EmailConfirmation} />
      </Switch>
      <Route component={Footer} />
    </div>
  );
};

export default Routes;
