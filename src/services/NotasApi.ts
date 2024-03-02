import axios from 'axios';
import { Nota, NotaPost } from '../types/Nota';

export class NotaService {
  public static async getNota(): Promise<Nota[]> {
    try {
      const response = await axios.get('http://127.0.0.1:8000/nota');
      return response.data as Nota[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async postNota(nota: NotaPost): Promise<NotaPost> {
    try {
      const response = await axios.post('http://127.0.0.1:8000/nota', nota);
      return response.data as NotaPost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async putNota(idNota: string, nota: NotaPost): Promise<NotaPost> {
    try {
      const response = await axios.put('http://127.0.0.1:8000/nota/'+nota.estudiante+'/'+idNota, nota);
      return response.data as NotaPost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  public static async deleteNota(idNota: string, idEstudiante: string): Promise<Nota> {
    try {
      const response = await axios.delete('http://127.0.0.1:8000/nota/'+idEstudiante+'/'+idNota);
      return response.data as Nota;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}