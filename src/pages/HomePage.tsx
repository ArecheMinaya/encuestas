import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FC } from 'react';

export default function HomePage() {
  const navigate = useNavigate();
  const { data } = useSelector((state: RootState) => state.auth);
  const [activeSection, setActiveSection] = useState<'encuestas' | 'historial'>('encuestas');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!data) {
      console.log('No hay data');
    }
    console.log(data?.userInfo?.nombreCompleto);
  }, [data, navigate]);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed z-40 inset-y-0 left-0 w-72 bg-gradient-to-br from-gray-800 to-gray-900 transform transition-transform duration-300 ease-in-out 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0 xl:static xl:inset-auto`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 xl:justify-center">
          <h6 className="text-white text-lg font-semibold">Dashboard Encuestas</h6>
          <button className="xl:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            ✖
          </button>
        </div>

        <div className="p-4">
          <ul className="flex flex-col gap-2">
            <li>
              <button
                onClick={() => setActiveSection('encuestas')}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  activeSection === 'encuestas'
                    ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                🧠 Encuestas
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('historial')}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  activeSection === 'historial'
                    ? 'bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-md'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                📜 Historial
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 w-full h-full overflow-auto p-4">
        {/* Navbar + Toggle */}
        <div className="flex justify-between items-center xl:justify-end mb-4">
          <DashboardNavbar userName={data?.userInfo?.nombreCompleto ?? 'Uknown'}/>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="block xl:hidden text-gray-600 text-2xl ml-4"
          >
            ☰
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex-1 overflow-auto">
          {activeSection === 'encuestas' && (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {data?.userEncuestas?.map((item) => (
                <EncuestaCard key={item.id} titulo={item.titulo} descripcion={item.descripcion} />
              ))}
            </div>
          )}

          {activeSection === 'historial' && (
            <div className="text-gray-700 text-lg font-medium text-center py-20">
              🕓 Historial de respuestas aún no implementado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}










const DashboardNavbar: FC<{ userName: string }> = (userName) => {
  return (
    <nav className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Left: Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <p>Dashboard</p>
          <span>/</span>
          <span className="text-blue-600 font-semibold">Inicio</span>
        </div>

        {/* Right: Search + Icons */}
        <div className="flex items-center gap-4 flex-wrap">

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 24c1.1046 0 2-.8954 2-2h-4c0 1.1046.8954 2 2 2zm6-6v-5c0-3.0376-1.6131-5.6447-4.5-6.32V6c0-.8284-.6716-1.5-1.5-1.5S10.5 5.1716 10.5 6v.68C7.6131 7.3553 6 9.9624 6 13v5l-1.7071 1.7071C4.1054 20.3166 4.3166 21 4.7071 21h14.5858c.3905 0 .6017-.6834.2929-1.2929L18 18z" />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 bg-red-500 rounded-full ring-2 ring-white text-[0]"></span>
          </button>
          {/* Avatar */}
          <div className="relative">
            <button className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 focus:outline-none">
              <img
                src={`https://ui-avatars.com/api/?name=${userName}`}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </button>
            {/* Aquí podrías desplegar un menú */}
          </div>
        </div>
      </div>
    </nav>
  );
};

interface EncuestaCardProps {
  titulo: string;
  descripcion: string;
}

const EncuestaCard: FC<EncuestaCardProps> = ({ titulo, descripcion }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="relative flex flex-col rounded-xl bg-white text-gray-700 shadow-md hover:shadow-xl transition-shadow cursor-pointer p-4 mt-8"
    >
      {/* Ícono */}
      <div className="absolute -top-6 left-4 bg-gradient-to-tr from-blue-600 to-blue-400 text-white rounded-xl shadow-lg w-16 h-16 grid place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
          <path
            fillRule="evenodd"
            d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
            clipRule="evenodd"
          />
          <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
        </svg>
      </div>

      {/* Contenido */}
      <div className=" ps-[80px]">
        <h2 className="font-bold text-gray-900 mb-2">{titulo}</h2>
        <p className="text-sm text-gray-600">{descripcion}</p>
      </div>
      <div className='h-full'></div>
      <button
        onClick={() => navigate('/encuesta/3')}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
      >
        Realizar encuesta
      </button>
    </motion.div>
  );
};
