import axios from 'axios';
import { Curso, CursoPost } from '../types/Curso';
import { API_URL } from './api';

export class CursoService {
  public static async getCurso(): Promise<Curso[]> {
    try {
      const response = await axios.get(`${API_URL}/curso`);
      return response.data as Curso[];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async postCurso(curso: CursoPost): Promise<CursoPost> {
    try {
      const response = await axios.post(`${API_URL}/curso`, curso);
      return response.data as CursoPost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public static async putCurso(idCurso: string,curso: CursoPost): Promise<CursoPost> {
    try {
      const response = await axios.put(`${API_URL}/curso`+idCurso, curso);
      return response.data as CursoPost;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  
  public static async deleteCurso(id: string): Promise<Curso> {
    try {
      const response = await axios.delete(`${API_URL}/curso`+id);
      return response.data as Curso;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}