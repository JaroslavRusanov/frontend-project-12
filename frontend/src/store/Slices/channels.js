/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import defaultChannel from '../../utils/defaultChannel.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  activeChannel: defaultChannel,
  channels: [],
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
  },
});

export const { setActiveChannel, setChannels } = channelsSlice.actions;
export const channelsSelector = (state) => state.channels.channels;
export const activeChannelSelector = (state) => state.channels.activeChannel;
export default channelsSlice.reducer;
