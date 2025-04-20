import { useState } from "react";
import { motion } from "framer-motion";
import {  useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authThunks";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [email, setEmail] = useState("Sebas@gmail.com"); // valor de mock por defecto
  const [password, setPassword] = useState("2228");       // valor de mock por defecto
  const [rememberMe, setRememberMe] = useState(false);

  const { loading } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(login(email, password));
    navigate('/home');
     

  };

 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-6xl shadow-xl rounded-2xl overflow-hidden">
        {/* Form Side */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 bg-white p-10"
        >
          <h1 className="text-3xl font-bold mb-6">Bienvenido de nuevo 👋</h1>
          <p className="text-lg mb-10 text-gray-500">Accede a tu cuenta y empieza a descubrir lo que la gente piensa.</p>
          <h2 className="text-2xl font-bold mb-6">Iniciar Sesión</h2>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tucorreo@ejemplo.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-blue-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2"
                />
                Recordarme
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* {(localError || error) && <div className="text-red-500 text-sm">{localError || error}</div>}
            {data && <div className="text-green-500 text-sm">{data.mensaje}</div>} */}

            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition duration-300 mt-14"
            >
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>
        </motion.div>

        {/* Image Side */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:block w-1/2 relative bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://www.shutterstock.com/image-vector/3d-paper-clipboard-task-management-600nw-2438070637.jpg")',
          }}
        >
          <div className="absolute bottom-10 left-10 text-white">
            <h3 className="text-xl font-semibold drop-shadow-md">Escape the Ordinary, Embrace the Journey!</h3>
            <p className="text-sm drop-shadow-md">Experience the world your way!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
