import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useProfile } from '../context/profile.context';
import Loading from './loader';

const PublicRoute = ({ children, ...props }) => {
  const { profile, isLoading } = useProfile();
  if (profile && !isLoading) {
    return <Redirect to="/" />;
  } else if (isLoading) {
    return <Loading />;
  } else {
    return <Route {...props}>{children}</Route>;
  }
};
export default PublicRoute;
