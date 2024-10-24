import { Curso, CursoPost } from '../types/Curso';
import { api, API_URL } from './api';

export class CursoService {
  public static async getCurso(): Promise<Curso[]> {
    try {
      const response = await api.get(`${API_URL}/curso`);
      return response.data as Curso[];
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return [];
    }
  }

  public static async postCurso(curso: CursoPost): Promise<CursoPost|null> {
    try {
      const response = await api.post(`${API_URL}/curso`, curso);
      return response.data as CursoPost;
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return null;
    }
  }

  public static async putCurso(idCurso: string,curso: CursoPost): Promise<CursoPost|null> {
    try {
      const response = await api.put(`${API_URL}/curso/`+idCurso, curso);
      return response.data as CursoPost;
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return null;
    }
  }
  
  public static async deleteCurso(id: string): Promise<Curso|null> {
    try {
      const response = await api.delete(`${API_URL}/curso/`+id);
      return response.data as Curso;
    } catch (error) {
      console.warn("Hubo un problema: ", error);
      return null;
    }
  }
}