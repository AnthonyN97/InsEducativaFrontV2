import axios from 'axios';
import { Curso, CursoPost } from '../types/Curso';

export class CursoService {
  public static async getCurso(): Promise<Curso[]> {
    try {
      const response = await axios.get('http://127.0.0.1:8000/curso');
      return response.data as Curso[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async postCurso(curso: CursoPost): Promise<CursoPost> {
    try {
      const response = await axios.post('http://127.0.0.1:8000/curso', curso);
      return response.data as CursoPost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async putCurso(idCurso: string,curso: CursoPost): Promise<CursoPost> {
    try {
      const response = await axios.put('http://127.0.0.1:8000/curso/'+idCurso, curso);
      return response.data as CursoPost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  public static async deleteCurso(id: string): Promise<Curso> {
    try {
      const response = await axios.delete('http://127.0.0.1:8000/curso/'+id);
      return response.data as Curso;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}