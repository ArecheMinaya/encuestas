export interface Encuesta {
    id: number;
    titulo: string;
    descripcion: string;
    esPublica: boolean;
    fechaExpiracion: string;
    estaActiva: boolean;
    usuarioId: number;
  }
  
  export interface UserInfo {
    id: number;
    nombreCompleto: string;
    email: string;
    passwordHash: string;
    rol: string;
    fechaRegistro: string;
  }
  
  export interface AuthResponse {
    mensaje: string;
    userInfo: UserInfo;
    userEncuestas: Encuesta[];
  }
  