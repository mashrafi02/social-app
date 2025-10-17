import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice'
import { authApi } from '../services/authApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  devTools: import.meta.env.MODE !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});


setupListeners(store.dispatch)