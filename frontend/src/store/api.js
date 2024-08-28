import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import socket from '../utils/socket.js';
import routes from '../utils/routes.js';

export const api = createApi({
  reducerPath: 'queryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: routes.apiPath,
    tagTypes: ['Channels', 'Message'],
    prepareHeaders: ((headers) => {
      const token = localStorage.getItem('userId');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }),
  }),
  endpoints: (builder) => ({
    getAuthToken: builder.mutation({
      query: (user) => ({
        url: routes.loginPath,
        method: 'POST',
        body: user,
      }),
    }),
    addNewUser: builder.mutation({
      query: (newUser) => ({
        url: routes.signupPath,
        method: 'POST',
        body: newUser,
      }),
    }),
    getChannels: builder.query({
      query: () => ({
        url: routes.channelsPath,
      }),
      providesTags: ['Channels'],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;

        const newChannelListener = (channel) => {
          updateCachedData((draft) => {
            draft.push(channel);
          });
        };

        const updateChannelListener = ({ id, name }) => {
          updateCachedData((draft) => {
            const channel = draft.find((el) => el.id === id);
            if (channel) {
              channel.name = name;
            }
          });
        };

        const removeChannelListener = (id) => {
          updateCachedData((draft) => {
            const index = draft.findIndex((el) => el.id === id);
            if (index === -1) {
              draft.splice(index, 1);
            }
          });
        };

        socket.on('newChannel', newChannelListener);
        socket.on('renameChannel', updateChannelListener);
        socket.on('removeChannel', removeChannelListener);

        await cacheEntryRemoved;

        socket.off('newChannel', newChannelListener);
        socket.off('renameChannel', updateChannelListener);
        socket.off('removeChannel', removeChannelListener);
      },
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channelsPath,
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channels'],
    }),
    editChannel: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: routes.channelsPathWithID(id),
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: routes.channelsPathWithID(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels'],
    }),
    getMessages: builder.query({
      query: () => ({
        url: routes.messagesPath,
      }),
      providesTags: ['Channels', 'Message'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.messagesPath,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Message'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: routes.messagesPathWithID(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const {
  useGetAuthTokenMutation,
  useAddNewUserMutation,
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
} = api;
