import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/',
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
        url: 'login',
        method: 'POST',
        body: user,
      }),
    }),
    getChannels: builder.query({
      query: () => ({
        url: 'channels',
      }),
    }),
    getMessages: builder.query({
      query: () => ({
        url: 'messages',
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useGetMessagesQuery,
  useGetAuthTokenMutation,
} = api;
