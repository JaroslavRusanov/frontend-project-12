/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  activeChannel: {
    id: 1,
    name: 'general',
    removable: false,
  },
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
  },
});

export const { setActiveChannel } = channelsSlice.actions;
export const activeChannelSelector = (state) => state.channels.activeChannel;
export default channelsSlice.reducer;
