/* eslint-disable no-param-reassign */
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
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
import { useGetChannelsQuery, useGetMessagesQuery } from './store/api.js';
import { channelsSelector, setChannels } from './store/Slices/channels.js';

const App = () => {
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelector);
  const channels = useSelector(channelsSelector);
  const { t } = useTranslation();

  try {
    const initMessages = useGetMessagesQuery();
    dispatch(setMessages(initMessages.data));
    const initChannels = useGetChannelsQuery();
    dispatch(setChannels(initChannels.data));
  } catch (err) {
    toast.error(t('toastify.error.conectionErr'));
    throw err;
  }

  const checkMessage = (data) => {
    const prevMessage = messages.filter(({ id }) => id === (data.id - 1));
    if (!data.body.body) {
      return prevMessage;
    }
    return data;
  };

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      const newMessages = [...messages, checkMessage(payload)];
      dispatch(setMessages(newMessages));
    });
  }, [messages, dispatch]);

  useEffect(() => {
    socket.on('newChannel', (data) => {
      const newChannels = [...channels, data];
      dispatch(setChannels(newChannels));
    });
    socket.on('removeChannel', (payload) => {
      const filteredChannels = channels.filter(({ id }) => payload.id === id);
      dispatch(setChannels(filteredChannels));
    });
    socket.on('renameChannel', (payload) => {
      const renamedChannels = channels.map((channel) => {
        if (channel.id === payload.id) {
          return payload;
        }
        return channel;
      });
      dispatch(setChannels(renamedChannels));
    });
  }, [channels, dispatch]);

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
