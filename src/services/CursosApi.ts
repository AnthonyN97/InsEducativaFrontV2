import axios from 'axios';
import { Curso } from '../types/Curso';

export const getCursos = async (): Promise<Curso[]> => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/curso');
    return response.data as Curso[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const postEstudiante = async (curso: Curso): Promise<Curso> => {
  try {
    const response = await axios.post('http://127.0.0.1:8000/curso', curso);
    return response.data as Curso;
  } catch (error) {
    console.error(error);
    throw error;
  }
}