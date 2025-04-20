// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import encuestaReducer from '../features/encuestas/encuestaSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    encuestas: encuestaReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
