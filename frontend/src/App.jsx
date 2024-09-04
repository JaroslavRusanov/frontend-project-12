import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from './utils/socket.js';
import AuthProvider from './auth/AuthProvider.jsx';
import AuthButton from './auth/AuthButton.jsx';
import PrivateRoute from './auth/PtivateRoute.jsx';
import Login from './Pages/Login/Login.jsx';
import NotFound from './Pages/NotFound/NotFound.jsx';
import Chat from './Pages/Chat/Chat.jsx';
import Signup from './Pages/Signup/Signup.jsx';
import './locales/i18n.js';
import { actionsMessages } from './store/Slices/messages.js';
import { actionChannels } from './store/Slices/channels.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(actionsMessages.addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(actionChannels.addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(actionChannels.removeChannel(payload.id));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(actionChannels.updateChannel(payload));
    });
  }, [dispatch]);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="h-100" id="chat">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
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
