import axios from 'axios';
import { Estudiante } from '../types/Estudiante';

export const getEstudiantes = async (): Promise<Estudiante[]> => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/estudiante');
    return response.data as Estudiante[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const postEstudiante = async (estudiante: Estudiante): Promise<Estudiante> => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/estudiante', estudiante);
      return response.data as Estudiante;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }