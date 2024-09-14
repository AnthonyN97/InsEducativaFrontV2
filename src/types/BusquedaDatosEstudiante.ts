export interface Nota {
    curso: string;
    nota: number;
    porcentaje: number;
};

export interface Promedio {
    curso: string;
    promedio: number;
};

export interface DatosEstudiante {
    estudiante: string;
    notas: Nota[];
    promedios: Promedio[];
};