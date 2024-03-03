export interface Estudiante {
  id: string;
  nombre: string;
}

export interface Curso {
  id: string;
  nombre: string;
  estudiantes: Estudiante[];
}
export interface CursoPost {
  nombre: string;
  estudiantes: string[];
}