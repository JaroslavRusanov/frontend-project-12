import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import routes from '../utils/routes.js';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: routes.apiPath,
    tagTypes: ['Channel', 'Message'],
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
    addMessage: builder.mutation({
      query: (message) => ({
        url: routes.messagesPath,
        method: 'POST',
        body: message,
      }),
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: routes.channelsPath,
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: routes.channelsPathWithID(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: routes.messagesPathWithID(id),
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
    editChannel: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: routes.channelsPathWithID(id),
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Channel'],
    }),
    getChannels: builder.query({
      query: () => ({
        url: routes.channelsPath,
      }),
      providesTags: ['Channel'],
    }),
    getMessages: builder.query({
      query: () => ({
        url: routes.messagesPath,
      }),
      providesTags: ['Message'],
    }),
  }),
});

export const {
  useGetAuthTokenMutation,
  useAddMessageMutation,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRemoveMessageMutation,
  useEditChannelMutation,
  useGetChannelsQuery,
  useGetMessagesQuery,
} = api;