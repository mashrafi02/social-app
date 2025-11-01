import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice'
import { authApi } from '../services/authApi';
import { postApi } from '../services/postApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import loadingReducer from '../features/loading/loadingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loader: loadingReducer,
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