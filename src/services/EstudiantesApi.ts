import axios from 'axios';
import { Estudiante, EstudiantePost } from '../types/Estudiante';
import { API_URL } from './api';

export class EstudianteService {
  public static async getEstudiantes(): Promise<Estudiante[]> {
    try {
      const response = await axios.get(`${API_URL}/estudiante`);
      return response.data as Estudiante[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async postEstudiantes(estudiante: EstudiantePost): Promise<Estudiante> {
    try {
      const response = await axios.post(`${API_URL}/estudiante`, estudiante);
      return response.data as Estudiante;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async putEstudiantes(id: string,estudiante: EstudiantePost): Promise<Estudiante> {
    try {
      const response = await axios.put(`${API_URL}/estudiante`+id, estudiante);
      return response.data as Estudiante;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  public static async deleteEstudiantes(id: string): Promise<Estudiante> {
    try {
      const response = await axios.delete(`${API_URL}/estudiante`+id);
      return response.data as Estudiante;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
