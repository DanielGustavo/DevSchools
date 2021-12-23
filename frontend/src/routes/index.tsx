import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import LandingPage from '../pages/LandingPage';
import SignupPage from '../pages/SignupPage';
import SigninPage from '../pages/SigninPage';
import Dashboard from '../pages/Dashboard';
import Classroom from '../pages/Classroom';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route path="/signin" component={SigninPage} />
    <Route path="/signup" component={SignupPage} />
    <Route path="/dashboard" isPrivate component={Dashboard} />
    <Route path="/classrooms/:id" isPrivate component={Classroom} />
  </Switch>
);

export default Routes;
