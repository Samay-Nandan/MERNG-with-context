import { useContext } from 'react';
import { Navigate } from 'react-router-dom'; 

import { AuthContext } from '../context/auth';

const AuthRoute = (props) => {
  const { children } = props
  const { user } = useContext(AuthContext);

  if( user ) return <Navigate to="/" />

  return children
  
}

export default AuthRoute;