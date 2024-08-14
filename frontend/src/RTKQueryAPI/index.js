import { configureStore } from '@reduxjs/toolkit';

// BEGIN (write your solution here)
import { api } from './Api.js';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});