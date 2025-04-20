import axios, { AxiosError } from 'axios';
import { AppDispatch } from '../../store/store';
import {
  getQuestionsStart,
  getQuestionsSuccess,
  getQuestionsFailure,
} from './encuestaSlice';
import { Pregunta } from './types';

export const getQuestions = (id: string) => async (dispatch: AppDispatch) => {
  console.log("🚀 Enviando solicitud de preguntas...");
  dispatch(getQuestionsStart());
  try {
    const response = await axios.get<Pregunta[]>(`/api/preguntas/${id}`);
    console.log("✅ Preguntas recibidas:", response.data);
    dispatch(getQuestionsSuccess(response.data));
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    const message = axiosError.response?.data?.message || 'Error inesperado al cargar las preguntas.';
    console.error("❌ Error cargando preguntas:", message);
    dispatch(getQuestionsFailure(message));
  }
};
