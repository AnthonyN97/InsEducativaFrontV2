interface Promedio {
  curso: string;
  promedio: number;
}

export interface Promedios {
    id: string;
    nombre: string;
    seccion: string;
    grado: string;
    promedios: Promedio[];
  }