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
import socket from './utils/socket';
import AuthProvider from './auth/AuthProvider';
import AuthButton from './auth/AuthButton';
import PrivateRoute from './auth/PrivateRoute';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Chat from './Pages/Chat/Chat';
import Signup from './Pages/Signup/Signup';
import './locales/i18n';
import { addMessage } from './store/Slices/messages';
import { addChannel, removeChannel, updateChannel } from './store/Slices/channels';
import { setActiveChannel } from './store/Slices/activeChannel';
import defaultChannel from './utils/defaultChannel';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload.id));
      dispatch(setActiveChannel(defaultChannel));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(updateChannel({ id: payload.id, changes: { name: payload.name } }));
    });

    return () => {
      socket.off();
    };
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
