interface Promedio {
  curso: string;
  promedio: number;
}

export interface Promedios {
    id: string;
    estudiante: string;
    promedio: Promedio[];
  }