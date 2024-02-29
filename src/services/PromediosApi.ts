import axios from 'axios';
import { Promedios } from '../types/Promedios';

export const getPromedios = async (): Promise<Promedios[]> => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/promedio');
    return response.data as Promedios[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
