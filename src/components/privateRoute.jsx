import React from 'react'
import { Redirect,Route} from 'react-router-dom'
const PrivateRoute = ({children,...props}) => {
    const profile=false;
    if(!profile){
        return <Redirect to='/signin'/>
    }
  return (
    <div>
      <Route {...props}>
        {children}
      </Route>
    </div>
  )
}

export default PrivateRoute;