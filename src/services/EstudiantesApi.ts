import axios from 'axios';
import { Estudiante, EstudiantePost } from '../types/Estudiante';


export class EstudianteService {
  public static async getEstudiantes(): Promise<Estudiante[]> {
    try {
      const response = await axios.get('http://127.0.0.1:8000/estudiante');
      return response.data as Estudiante[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async postEstudiantes(estudiante: EstudiantePost): Promise<Estudiante> {
    try {
      const response = await axios.post('http://127.0.0.1:8000/estudiante', estudiante);
      return response.data as Estudiante;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async putEstudiantes(id: string,estudiante: EstudiantePost): Promise<Estudiante> {
    try {
      const response = await axios.put('http://127.0.0.1:8000/estudiante/'+id, estudiante);
      return response.data as Estudiante;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  public static async deleteEstudiantes(id: string): Promise<Estudiante> {
    try {
      const response = await axios.delete('http://127.0.0.1:8000/estudiante/'+id);
      return response.data as Estudiante;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
