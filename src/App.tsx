import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FormularioEstudiante from './FormularioEstudiante';
import EstudiantesPage from './pages/EstudiantesPage';

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
  ])

  return (

    <RouterProvider router={router} />
  );
}

export default App;
