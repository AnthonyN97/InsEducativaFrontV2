import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EstudiantesPage from './pages/EstudiantesPage';
import NotasPage from './pages/NotasPage';
import PromediosPage from './pages/PromediosPages';
import CursosPage from './pages/CursosPage';
import BuscarNotasPorPadres from './components/BuscarNotasPorPadres';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header'; // Asegúrate de importar tu componente Header
import { useEffect, useState } from 'react';
import LoginPage from './pages/LoginPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Comprueba si el usuario está autenticado al cargar la aplicación
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<EstudiantesPage />} />
            <Route path="/notas" element={<NotasPage />} />
            <Route path="/promedios" element={<PromediosPage />} />
            <Route path="/cursos" element={<CursosPage />} />
          </Routes>
          <ToastContainer />
        </Router>
      ) : (
        <div className='flex flex-row bg-gray-50'>
          <div className='basis-1/2'>
            <LoginPage onLogin={() => setIsAuthenticated(true)} />
          </div>
          <div className='basis-1/2'>
            <BuscarNotasPorPadres />
          </div>
        </div>
      )}

    </>

  );
}

export default App;