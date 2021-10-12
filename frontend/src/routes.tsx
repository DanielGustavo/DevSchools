import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/signup" component={SignupPage} />
  </Switch>
);

export default Routes;
