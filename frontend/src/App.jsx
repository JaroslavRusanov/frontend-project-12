import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { Button } from 'react-bootstrap';

import useAuth from './auth/hook.jsx';
import AuthContext from './auth/contexts.jsx';

import Login from './Pages/Login/Login.jsx';
import NotFound from './Pages/NotFound/NotFound.jsx';
import Chat from './Pages/Chat/Chat.jsx';

import store from './RTKQueryAPI/index.js';

// Authorization is designed with Context and AuthHook for correct redirection routes
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
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

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn && <Button type="button" onClick={auth.logOut}>Выйти</Button>
  );
};

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <a className="navbar-brand" href="/">Hexlet Chat</a>
                <AuthButton />
              </div>

            </nav>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="login" element={<Login />} />
              <Route
                path="/"
                element={(
                  <PrivateRoute>
                    <Chat />
                  </PrivateRoute>
                )}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  </Provider>
);

export default App;
