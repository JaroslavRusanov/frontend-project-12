import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button } from 'react-bootstrap';

import useAuth from './auth/hook.jsx';
import AuthContext from './auth/contexts.jsx';
import Login from './components/Login/Login.jsx';
import NotFound from './components/NotFound/NotFound.jsx';
import Chat from './components/Chat/Chat.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
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
    auth.loggedIn
      ? <Button type onClick={auth.logOut}>Выйти</Button>
      : null
  );
};

const App = () => (
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
);

export default App;
