import { useState } from 'react';
import AuthContext from './contexts.jsx';

const AuthProvider = ({ children }) => {
  const getInitLogggedIn = () => {
    if (localStorage.getItem('userId')) {
      return true;
    }
    return false;
  };
  const [loggedIn, setLoggedIn] = useState(getInitLogggedIn());
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
