import React from 'react'
import { Redirect,Route } from 'react-router-dom';

const PublicRoute = ({children,...props}) => {
    const profile=false;
    if(profile){
        return <Redirect to="/"/>;
    }
  return (
    <Route {...props}>
    {children}
  </Route>
  )
}

export default PublicRoute
