import { createSlice, createEntityAdapter, PayloadAction, EntityState } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { Channel } from '../types'

// Entity adapter с типом Channel
const channelsAdapter = createEntityAdapter<Channel>()

// initialState с типом EntityState<Channel>
const initialState: EntityState<Channel, string> = channelsAdapter.getInitialState()

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action: PayloadAction<Channel[]>) => {
      channelsAdapter.setAll(state, action.payload)
    },
    addChannel: (state, action: PayloadAction<Channel>) => {
      channelsAdapter.addOne(state, action.payload)
    },
    removeChannel: (state, action: PayloadAction<string>) => {
      channelsAdapter.removeOne(state, action.payload)
    },
    updateChannel: (state, action: PayloadAction<{ id: string; changes: Partial<Channel> }>) => {
      channelsAdapter.updateOne(state, action.payload)
    },
  },
})

export const { setChannels, addChannel, removeChannel, updateChannel } = channelsSlice.actions

// Селектор
export const channelsSelectors = channelsAdapter.getSelectors<RootState>((state) => state.channels)

export default channelsSlice.reducer
