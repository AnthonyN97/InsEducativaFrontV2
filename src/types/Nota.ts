export interface Nota {
    id: string;
    estudiante_id: string;
    estudiante: string;
    curso_id: number;
    curso: string;
    nota: number;
    porcentaje: number;
    descripcion: string;
  }

export interface NotaPost {
    estudiante: string;
    curso: number;
    nota: number;
    porcentaje: number;
    descripcion: string;
  }