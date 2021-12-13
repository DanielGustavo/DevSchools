import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/signin" component={SigninPage} />
  </Switch>
);

export default Routes;
