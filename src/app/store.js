import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice'
import { authApi } from '../services/authApi';
import { postApi } from '../services/postApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import postReducer from '../features/publicPosts/postSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
  },
  devTools: import.meta.env.MODE !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(postApi.middleware),
});


setupListeners(store.dispatch)