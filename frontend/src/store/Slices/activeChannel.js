/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import defaultChannel from '../../utils/defaultChannel.js';

const activeChannelsAdapter = createEntityAdapter();
const initialState = activeChannelsAdapter.getInitialState({
  activeChannel: defaultChannel,
});

const activeChannelsSlice = createSlice({
  name: 'activeChannel',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
  },
});

export const { setActiveChannel } = activeChannelsSlice.actions;
export const activeChannelSelector = (state) => state.activeChannel.activeChannel;
export default activeChannelsSlice.reducer;
