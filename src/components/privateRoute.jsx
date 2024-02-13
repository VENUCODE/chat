import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useProfile } from '../context/profile.context';
const PrivateRoute = ({ children, ...props }) => {
  const profile = useProfile();
  if (!profile) return <Redirect to="/signin" />;
  return (
    <div>
      <Route {...props}>{children}</Route>
    </div>
  );
};

export default PrivateRoute;
