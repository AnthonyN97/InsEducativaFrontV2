export interface Nota {
    id: string;
    estudiante_id: string;
    estudiante: string;
    curso: string;
    nota: number;
    porcentaje: number;
  }

export interface NotaPost {
    estudiante: string;
    curso: string;
    nota: number;
    porcentaje: number;
  }