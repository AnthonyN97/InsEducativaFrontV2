import { Promedios } from '../types/Promedios';
import { api, API_URL } from './api';

export class PromedioService {
  public static async getPromedio(): Promise<Promedios[]> {
    try {
      const response = await api.get(`${API_URL}/promeEst`);
      return response.data as Promedios[];
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return [];
    }
  }
}