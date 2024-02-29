import axios from 'axios';
import { Nota } from '../types/Nota';

export const getNotas = async (): Promise<Nota[]> => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/nota');
    return response.data as Nota[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const postNota = async (nota: Nota): Promise<Nota> => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/nota', nota);
      return response.data as Nota;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }