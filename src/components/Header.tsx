import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const links = [
    { name: 'Estudiantes', href: '/' },
    { name: 'Notas', href: '/notas' },
    { name: 'Cursos', href: '/cursos' },
    { name: 'Promedios', href: '/promedios' },
  ];

  return (
    <>
      <nav className='bg-blue-900'>
        <div className="max-w-screen-xl flex items-center justify-center mx-auto p-4">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            {links.map((link, index) => (
              <li key={index}>
                <div className="py-2 pl-3 pr-4 text-white">
                  <Link to={link.href}>{link.name}</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}


export default Header;