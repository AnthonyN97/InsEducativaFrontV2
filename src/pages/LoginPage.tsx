import axios from "axios";
import { useState } from "react";
import { API_URL } from "../services/api";

interface LoginPageProps {
    onLogin: () => void;  // Define la prop onLogin
  }
  
  const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      try {
        const response = await axios.post(`${API_URL}/api/token/`, {
          username,
          password
        });
  
        // Si la petición es exitosa, almacena el token en localStorage
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
        setError(null);
  
        // Llama a onLogin
        onLogin();

        // Recargar la página
        window.location.reload();
      } catch (error) {
        // Si la petición falla, muestra un mensaje de error
        setError('El nombre de usuario o la contraseña son incorrectos. Por favor, inténtalo de nuevo.');
      }
    };
  
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <form onSubmit={handleSubmit} className="w-full max-w-sm p-8 space-y-4 bg-white rounded shadow-md">
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nombre de usuario" required className="w-full px-3 py-2 text-gray-700 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required className="w-full px-3 py-2 text-gray-700 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          <button type="submit" className="w-full px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Iniciar sesión</button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    );
  };
  
  export default LoginPage;