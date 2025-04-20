// src/pages/EncuestaPage.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { getQuestions } from '../features/encuestas/encuestasThunks';
import { useParams } from 'react-router-dom';


type Respuestas = Record<number, number>; // preguntaId -> opcionId

export default function EncuestaPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data, error} = useSelector((state: RootState) => state.encuestas);
  const infromarion = useSelector((state: RootState) => state.auth);
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [title, setTitle] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const { id } = useParams();

  useEffect(() => {
    dispatch(getQuestions(id??"3")); // ID hardcodeado o desde route param
    setTitle(infromarion.data?.userEncuestas.find((encuesta) => encuesta.id === Number(id))?.titulo || '');
    setDescripcion(infromarion.data?.userEncuestas.find((encuesta) => encuesta.id === Number(id))?.descripcion || '');
  }, [id, dispatch, infromarion.data]);

  const handleSelect = (preguntaId: number, opcionId: number) => {
    setRespuestas((prev) => ({ ...prev, [preguntaId]: opcionId }));
  };

  const handleSubmit = () => {
    console.log('📤 Enviando respuestas:', respuestas);
    alert('¡Gracias por responder la encuesta!');
  };

 

  return (
   <div className='flex justify-center items-center min-h-[100vh] bg-blue-50'>
      <div className="max-w-5xl mx-auto px-10 py-10 shadow-md hover:shadow-lg rounded-xl mt-10 bg-white">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{title}</h1>
      <p className="text-gray-600 mb-8">{descripcion}</p>
      {loading && <p className="text-blue-500">Cargando preguntas...</p>}
      {error && <p className="text-red-500">Error al cargar preguntas: {error}</p>}
      {!loading && data && (
        <>
          <div className="grid gap-6">
            {data.map((pregunta) => (
              <EncuestaFormCard
                key={pregunta.id}
                pregunta={pregunta}
                selectedOptionId={respuestas[pregunta.id]}
                onSelect={handleSelect}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Enviar respuestas
            </button>
          </div>
        </>
      )}
    </div>
   </div>
  );
}

// src/components/EncuestaFormCard.tsx
import { FC } from 'react';
import { motion } from 'framer-motion';
import { Pregunta } from '../features/encuestas/types';


interface EncuestaFormCardProps {
  pregunta: Pregunta;
  onSelect: (preguntaId: number, opcionId: number) => void;
  selectedOptionId?: number;
}
const EncuestaFormCard: FC<EncuestaFormCardProps> = ({
  pregunta,
  onSelect,
  selectedOptionId,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md hover:shadow-lg transition p-6"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {pregunta.textoPregunta}
      </h2>

      <div className="space-y-3">
        {pregunta.opciones.map((opcion) => (
          <label
            key={opcion.id}
            className={`flex items-center p-3 border rounded-md cursor-pointer transition  ${
              selectedOptionId === opcion.id
                ? 'border-blue-500 bg-blue-50'
                : 'hover:border-blue-300 border-gray-300'
            }`}
          >
            <input
              type="radio"
              name={`pregunta-${pregunta.id}`}
              value={opcion.id}
              checked={selectedOptionId === opcion.id}
              onChange={() => onSelect(pregunta.id, opcion.id)}
              className="mr-3 accent-blue-600"
            />
            <span className="text-gray-700 text-sm">{opcion.textoPregunta}</span>
          </label>
        ))}
      </div>
    </motion.div>
  );
};

