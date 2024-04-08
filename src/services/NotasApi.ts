import axios from 'axios';
import { Nota, NotaPost } from '../types/Nota';
import { API_URL } from './api';

export class NotaService {
  public static async getNota(): Promise<Nota[]> {
    try {
      const response = await axios.get(`${API_URL}/nota`);
      return response.data as Nota[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async postNota(nota: NotaPost): Promise<NotaPost> {
    try {
      const response = await axios.post(`${API_URL}/nota`, nota);
      return response.data as NotaPost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async putNota(idNota: string, nota: NotaPost): Promise<NotaPost> {
    try {
      const response = await axios.put(`${API_URL}/nota`+nota.estudiante+'/'+idNota, nota);
      return response.data as NotaPost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  public static async deleteNota(idNota: string, idEstudiante: string): Promise<Nota> {
    try {
      const response = await axios.delete(`${API_URL}/nota`+idEstudiante+'/'+idNota);
      return response.data as Nota;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}