import { Estudiante, EstudiantePost } from '../types/Estudiante';
import { api, API_URL } from './api';

export class EstudianteService {
  public static async getEstudiantes(): Promise<Estudiante[]> {
    try {
      const response = await api.get(`${API_URL}/estudiante`);
      return response.data as Estudiante[];
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return [];
    }
  }

  public static async postEstudiantes(estudiante: EstudiantePost): Promise<Estudiante|null> {
    try {
      const response = await api.post(`${API_URL}/estudiante`, estudiante);
      return response.data as Estudiante;
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return null;
    }
  }

  public static async putEstudiantes(id: string,estudiante: EstudiantePost): Promise<Estudiante|null> {
    try {
      const response = await api.put(`${API_URL}/estudiante`+id, estudiante);
      return response.data as Estudiante;
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return null;
    }
  }
  
  public static async deleteEstudiantes(id: string): Promise<Estudiante|null> {
    try {
      const response = await api.delete(`${API_URL}/estudiante`+id);
      return response.data as Estudiante;
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return null;
    }
  }
}
