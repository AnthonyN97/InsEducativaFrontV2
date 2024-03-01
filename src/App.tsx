import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EstudiantesPage from './pages/EstudiantesPage';
import NotasPage from './pages/NotasPage';
import PromediosPage from './pages/PromediosPages';
import CursosPage from './pages/CursosPage';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header'; // Asegúrate de importar tu componente Header

function App() {
  return (
    <Router>
      <Header /> {/* Aquí incluyes el Header */}
      <Routes>
        <Route path="/" element={<EstudiantesPage />} />
        <Route path="/notas" element={<NotasPage />} />
        <Route path="/promedios" element={<PromediosPage />} />
        <Route path="/cursos" element={<CursosPage />} />
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;