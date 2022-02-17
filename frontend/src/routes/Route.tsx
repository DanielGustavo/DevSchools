import React from 'react';
import {
  Redirect,
  Route as DefaultRoute,
  RouteProps as DefaultRouteProps,
} from 'react-router-dom';

import useAuth from '../hooks/useAuth';

import LoadingPage from '../pages/LoadingPage';

interface RouteProps extends DefaultRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate,
  component: Component,
  ...rest
}) => {
  const { authenticated, loading } = useAuth();

  return (
    <DefaultRoute
      {...rest}
      component={() => {
        if (loading) {
          return <LoadingPage />;
        }

        if (!!isPrivate === authenticated) {
          return <Component />;
        }

        return isPrivate ? (
          <Redirect to="/signin" />
        ) : (
          <Redirect to="/dashboard" />
        );
      }}
    />
  );
};

export default Route;
