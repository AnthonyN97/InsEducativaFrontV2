import axios from 'axios';
import { api, API_URL } from './api';
import { DatosEstudiante } from '../types/BusquedaDatosEstudiante';

export class NotaPromIDService {
  public static async postPromedioById(studentId: string): Promise<DatosEstudiante| null> {
    try {
      const response = await axios.post(`${API_URL}/notaPromId`, { id_estudiante: studentId });
      return response.data as DatosEstudiante;
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return null;
    }
  }
}
