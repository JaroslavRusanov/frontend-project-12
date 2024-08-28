import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages, messagesSelector } from './store/Slices/messages.js';
import socket from './utils/socket.js';
import AuthProvider from './auth/AuthProvider.jsx';
import AuthButton from './auth/AuthButton.jsx';
import PrivateRoute from './auth/PtivateRoute.jsx';
import Login from './Pages/Login/Login.jsx';
import NotFound from './Pages/NotFound/NotFound.jsx';
import Chat from './Pages/Chat/Chat.jsx';
import Signup from './Pages/Signup/Signup.jsx';
import './locales/i18n.js';

const App = () => {
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelector);

  useEffect(() => {
    socket.on('newMessage', (data) => {
      const newMessages = [...messages, data];
      dispatch(setMessages(newMessages));
    });
  }, [messages]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="h-100" id="chat">
          <div className="d-flex flex-column h-100">
            <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
              <div className="container">
                <Link className="navbar-brand" to="/">Hexlet Chat</Link>
                <AuthButton />
              </div>
            </nav>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
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
};

export default App;
