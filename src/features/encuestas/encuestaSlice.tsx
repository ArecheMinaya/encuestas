// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pregunta } from './types';

interface EncuestaState {
  data: Pregunta[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: EncuestaState = {
  data: null,
  loading: false,
  error: null,
};

const encuestaSlice = createSlice({
  name: 'encuesta',
  initialState,
  reducers: {
    getQuestionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    getQuestionsSuccess(state, action: PayloadAction<Pregunta[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    getQuestionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { getQuestionsStart, getQuestionsSuccess, getQuestionsFailure } = encuestaSlice.actions;
export default encuestaSlice.reducer;
