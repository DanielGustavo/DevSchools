import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import LandingPage from '../pages/LandingPage';
import SignupPage from '../pages/SignupPage';
import SigninPage from '../pages/SigninPage';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/signin" component={SigninPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/dashboard" isPrivate component={() => <h1>...</h1>} />
  </Switch>
);

export default Routes;
