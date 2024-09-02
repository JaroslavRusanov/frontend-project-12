import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './api.js';
import channelsReducer from './Slices/channels.js';
import messagesReducer from './Slices/messages.js';
import tokenReducer from './Slices/authToken.js';

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    channels: channelsReducer,
    messages: messagesReducer,
    auth: tokenReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export default store;
