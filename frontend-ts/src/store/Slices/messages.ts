  import { createSlice, createEntityAdapter, PayloadAction, EntityState } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import { Message } from '../types'

// Entity adapter с типом Message
const messagesAdapter = createEntityAdapter<Message>()

// initialState с дженериками
const initialState: EntityState<Message, string> = messagesAdapter.getInitialState()

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Message[]>) => {
      messagesAdapter.setAll(state, action.payload)
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      messagesAdapter.addOne(state, action.payload)
    },
    removeMessage: (state, action: PayloadAction<string>) => {
      messagesAdapter.removeOne(state, action.payload)
    },
    updateMessage: (state, action: PayloadAction<Message>) => {
      messagesAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
    },
  },
})

export const { setMessages, addMessage, removeMessage, updateMessage } = messagesSlice.actions

// Селектор
export const messagesSelectors = messagesAdapter.getSelectors<RootState>((state) => state.messages)

export default messagesSlice.reducer
