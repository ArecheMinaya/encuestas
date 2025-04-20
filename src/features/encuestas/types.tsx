
export interface Opcion {
    id: number;
    textoOpcion: string | null;
    valor: number;
    textoPregunta: string;
  }
  
  export interface Pregunta {
    id: number;
    encuestaId: number;
    textoPregunta: string;
    tipoPregunta: 'OpcionMultiple';
    orden: number;
    opciones: Opcion[];
  }
  