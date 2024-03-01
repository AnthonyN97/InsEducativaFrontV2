import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Estudiantes</Link></li>
          <li><Link to="/notas">Notas</Link></li>
          <li><Link to="/promedios">Promedios</Link></li>
          <li><Link to="/cursos">Cursos</Link></li>
        </ul>
      </nav>
    </header>
  );
}


export default Header;