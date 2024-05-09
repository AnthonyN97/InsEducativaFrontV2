import axios from 'axios';

export const API_URL = 'http://127.0.0.1:8000';

// Crea una instancia de axios con un encabezado de autorización predeterminado
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`  // Asume que el token se almacena en localStorage
  }
});

// Agrega un interceptor de respuesta a la instancia de axios
api.interceptors.response.use(
  response => response,  // Si la respuesta es exitosa, simplemente devuélvela
  async error => {
    if (error.response.status === 401) {  // Si la respuesta es 401 Unauthorized
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          // Intenta obtener un nuevo token de acceso
          const response = await axios.post(`${API_URL}/api/token/refresh/`, {
            refresh: refreshToken
          });

          // Almacena el nuevo token de acceso
          localStorage.setItem('token', response.data.access);

          // Actualiza el encabezado de autorización de la instancia de axios
          api.defaults.headers['Authorization'] = `Bearer ${response.data.access}`;

          // Reintenta la solicitud original
          return api(error.config);
        } catch (error) {
          console.warn("El token de actualización ha expirado. Por favor, inicia sesión de nuevo.");
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);