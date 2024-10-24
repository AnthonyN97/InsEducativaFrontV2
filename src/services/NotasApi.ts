import { Nota, NotaPost } from '../types/Nota';
import { api, API_URL } from './api';

export class NotaService {
  public static async getNota(): Promise<Nota[]> {
    const token = localStorage.getItem('token')
    if(!token){
      return[]
    }
    try {
      const response = await api.get(`${API_URL}/nota`);
      return response.data as Nota[];
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return [];
    }
  }

  public static async postNota(nota: NotaPost): Promise<NotaPost | null> {
    try {
      const response = await api.post(`${API_URL}/nota`, nota);
      return response.data as NotaPost;
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return null;
    }
  }

  public static async putNota(idNota: string, nota: NotaPost): Promise<NotaPost|null> {
    try {
      const response = await api.put(`${API_URL}/nota/`+nota.estudiante+'/'+idNota, nota);
      return response.data as NotaPost;
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return null;
    }
  }
  
  public static async deleteNota(idNota: string, idEstudiante: string): Promise<Nota|null> {
    try {
      const response = await api.delete(`${API_URL}/nota/`+idEstudiante+'/'+idNota);
      return response.data as Nota;
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return null;
    }
  }

  public static async postNotasGroup(notas: NotaPost[]): Promise<NotaPost[] | null> {
    try {
      const response = await api.post(`${API_URL}/nota`, notas);
      return response.data as NotaPost[];
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return null;
    }
  }

}