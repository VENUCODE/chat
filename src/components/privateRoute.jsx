import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useProfile } from '../context/profile.context';
import Loading from './loader';
const PrivateRoute = ({ children, ...props }) => {
  const { profile, isLoading } = useProfile();
  // console.log('Private is Loading:', isLoading);

  if (isLoading && !profile) return <Loading />;
  else if (!isLoading && profile) {
    return (
      <div>
        <Route {...props}>{children}</Route>
      </div>
    );
  } else {
    return <Redirect to="/signin" />;
  }
};

export default PrivateRoute;
