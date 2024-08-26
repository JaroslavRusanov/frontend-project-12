/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({
  messages: [],
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = messagesSlice.actions;
export const messagesSelector = (state) => state.messages.messages;
export default messagesSlice.reducer;
