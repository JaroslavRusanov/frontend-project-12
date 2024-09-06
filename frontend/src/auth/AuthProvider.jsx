import { useState } from 'react';
import { useSelector } from 'react-redux';
import { tokenSelector } from '../store/Slices/authToken.js';
import AuthContext from './contexts.jsx';

const AuthProvider = ({ children }) => {
  const currentToken = useSelector(tokenSelector);
  const localStorageToken = localStorage.getItem('userId');

  const getInitLoggedIn = () => {
    if (localStorageToken && localStorageToken === currentToken) {
      return true;
    }
    return false;
  };
  const [loggedIn, setLoggedIn] = useState(getInitLoggedIn());
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setLoggedIn(false);
  };

  return (
    /* eslint-disable-next-line react/jsx-no-constructed-context-values */
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
