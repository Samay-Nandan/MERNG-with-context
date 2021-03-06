import { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null
}

const jwtToken = localStorage.getItem('jwtToken');

if ( jwtToken ) {
  const decodedToken = jwtDecode( jwtToken );

  decodedToken.exp * 1000 < Date.now() ? localStorage.removeItem('jwtToken') : initialState.user = decodedToken;

}

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
});

const authReducer = (state, action) => {
  switch(action.type){
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    default: 
      return state;
  }
}

export const AuthProvider = ( props ) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = ( userData ) => {
    localStorage.setItem("jwtToken", userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: 'LOGOUT' });
  }

  return(
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}