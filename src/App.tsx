import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import "./mock/axiosMock";
import EncuestaPage from './pages/EncuestaPage';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/encuesta/:id' element={<EncuestaPage />} />
      </Routes>
    </>
  );
}

export default App;
