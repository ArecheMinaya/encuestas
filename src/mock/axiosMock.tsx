// src/mocks/axiosMock.ts
import axios from 'axios';
import { AuthResponse } from '../features/auth/types';
import { Pregunta } from '../features/encuestas/types';

const mockResponse: AuthResponse = {
  mensaje: "Inicio de sesión exitoso. Bienvenido/a. Sebastian Omar Joaquin Minaya",
  userInfo: {
    id: 2,
    nombreCompleto: "Sebastian Omar Joaquin Minaya",
    email: "Sebas@gmail.com",
    passwordHash: "2228",
    rol: "Usuario",
    fechaRegistro: "2025-04-12T00:38:31.797"
  },
  userEncuestas: [
    {
      id: 3,
      titulo: "Verdaderamente existimos o todo esto es una simulacion?",
      descripcion: "Explique con sus palabras lo que usted considera acerca de todo",
      esPublica: true,
      fechaExpiracion: "2025-04-25T16:57:57.637",
      estaActiva: true,
      usuarioId: 5
    },
    {
      id: 4,
      titulo: "La Nutella debe ser gratis?",
      descripcion: "Explica brevemente si la nutella debe ser gratis y por que?",
      esPublica: true,
      fechaExpiracion: "2025-04-20T16:56:34.557",
      estaActiva: true,
      usuarioId: 5
    }
  ]
};

const mockPreguntas: Pregunta[] = [
  {
    id: 9,
    encuestaId: 3,
    textoPregunta: "¿Consideras que somos correctos para este mundo?",
    tipoPregunta: "OpcionMultiple",
    orden: 1,
    opciones: [
      { id: 6, textoOpcion: null, valor: 0, textoPregunta: "Sí" }
    ]
  },
  {
    id: 10,
    encuestaId: 3,
    textoPregunta: "¿Consideras que somos correctos para este mundo?",
    tipoPregunta: "OpcionMultiple",
    orden: 2,
    opciones: [
      { id: 7, textoOpcion: null, valor: 0, textoPregunta: "Sí, tenemos un propósito valioso" },
      { id: 8, textoOpcion: null, valor: 0, textoPregunta: "No, causamos más daño que bien" },
      { id: 9, textoOpcion: null, valor: 0, textoPregunta: "Depende de las acciones de cada persona" }
    ]
  }
];

axios.interceptors.request.use(async (config) => {
  // LOGIN
  if (config.url === '/api/login' && config.method === 'post') {
    const { email, password } = config.data;
    await new Promise((res) => setTimeout(res, 1000));

    if (email === 'Sebas@gmail.com' && password === '2228') {
      config.adapter = () =>
        Promise.resolve({
          data: mockResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config,
        });
    } else {
      config.adapter = () =>
        Promise.reject({
          response: {
            status: 401,
            data: { message: 'Credenciales inválidas' },
          },
        });
    }
  }

  // PREGUNTAS MOCK
  if (config.url?.startsWith('/api/preguntas/3') && config.method === 'get') {
    await new Promise((res) => setTimeout(res, 1000));
    config.adapter = () =>
      Promise.resolve({
        data: mockPreguntas,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      });
  }

  return config;
});
