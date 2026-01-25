import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './api'

import channelsReducer from './Slices/channels'
import messagesReducer from './Slices/messages'
import tokenReducer from './Slices/authToken'
import activeChannelReducer from './Slices/activeChannel'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    channels: channelsReducer,
    activeChannel: activeChannelReducer,
    messages: messagesReducer,
    auth: tokenReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

// type  getState
export type RootState = ReturnType<typeof store.getState>

// type dispatch
export type AppDispatch = typeof store.dispatch
