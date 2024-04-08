import axios from 'axios';
import { Promedios } from '../types/Promedios';
import { API_URL } from './api';

export class PromedioService {
  public static async getPromedio(): Promise<Promedios[]> {
    try {
      const response = await axios.get(`${API_URL}/promeEst`);
      return response.data as Promedios[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}