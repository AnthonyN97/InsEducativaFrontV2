import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormularioEstudiante from './FormularioEstudiante';
import EstudiantesPage from './pages/EstudiantesPage';
import NotasPage from './pages/NotasPage';
import PromediosPage from './pages/PromediosPages';
import CursosPage from './pages/CursosPage';

function App() {

  const router = createBrowserRouter([
    {
      path: `/`,
      element: <EstudiantesPage/>,
    },
    {
      path: `/formularioestudiante`,
      element: <FormularioEstudiante/>,
    },
    {
      path: `/notas`,
      element: <NotasPage/>,
    },
    {
      path: `/promedios`,
      element: <PromediosPage/>,
    },
    {
      path: `/cursos`,
      element: <CursosPage/>,
    }
  ])

  return (

    <RouterProvider router={router} />
  );
}

export default App;
