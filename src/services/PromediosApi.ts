import axios from 'axios';
import { Promedios } from '../types/Promedios';

export class PromedioService {
  public static async getPromedio(): Promise<Promedios[]> {
    try {
      const response = await axios.get('http://127.0.0.1:8000/promeEst');
      return response.data as Promedios[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}