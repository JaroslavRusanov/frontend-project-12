import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from '@reduxjs/toolkit'

import defaultChannel from '../../utils/defaultChannel'
import type { RootState } from '../index'
import type { Channel } from '../types'

const activeChannelsAdapter = createEntityAdapter<Channel>()

const initialState = activeChannelsAdapter.getInitialState({
  activeChannel: defaultChannel as Channel,
})

const activeChannelsSlice = createSlice({
  name: 'activeChannel',
  initialState,

  reducers: {
    setActiveChannel: (
      state,
      action: PayloadAction<Channel>,
    ) => {
      state.activeChannel = action.payload
    },
  },
})

export const { setActiveChannel } = activeChannelsSlice.actions

/** Селектор */
export const activeChannelSelector = (state: RootState): Channel =>
  state.activeChannel.activeChannel

export default activeChannelsSlice.reducer

