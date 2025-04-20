// src/features/auth/authThunks.ts
import axios from 'axios';
import { loginStart, loginSuccess, loginFailure } from './authSlice';
import { AuthResponse } from './types';
import { AppDispatch } from '../../store/store';
import { AxiosError } from 'axios';

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
    console.log("🚀 Enviando solicitud de inicio de sesión...");
  dispatch(loginStart());
  try {
    const response = await axios.post<AuthResponse>('/api/login', { email, password });
    console.log("✅ Inicio de sesión exitoso:", response.data.mensaje);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const message = axiosError.response?.data?.message || 'Error inesperado';
    console.error("❌ Error en login:", message);
    dispatch(loginFailure(message));
  }
};

