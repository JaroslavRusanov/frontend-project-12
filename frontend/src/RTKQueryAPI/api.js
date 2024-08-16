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
        url: routes.messagePath,
        method: 'POST',
        body: message,
      }),
    }),
    getChannels: builder.query({
      query: () => ({
        url: routes.channelsPath,
      }),
    }),
  }),
});

export const {
  useGetAuthTokenMutation,
  useAddMessageMutation,
  useGetChannelsQuery,
} = api;
