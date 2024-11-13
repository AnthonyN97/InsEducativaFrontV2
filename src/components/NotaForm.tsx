import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Nota, NotaPost } from "../types/Nota";
import { NotaService } from "../services/NotasApi";
import { EstudianteService } from "../services/EstudiantesApi";
import { Estudiante } from "../types/Estudiante";
import { CursoService } from "../services/CursosApi";
import { Curso } from "../types/Curso";

type propTypes = {
    open: boolean;
    onClose: () => void;
    nota?: Nota | null
    actualizarDatos: () => void;
};

const NotaForm: React.FC<propTypes> = ({ onClose, nota, actualizarDatos }) => {
    const [puntaje, setPuntaje] = useState(nota ? nota.nota : '');
    const [estudiante, setEstudiante] = useState(nota ? nota.estudiante_id : '');
    const [curso, setCurso] = useState(nota ? nota.curso_id : '');
    const [porcentaje, setPorcentaje] = useState(nota ? nota.porcentaje : '');
    const [descripcion, setDescripcion] = useState(nota ? nota.descripcion : '');
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
    const [cursos, setCursos] = useState<Curso[]>([])
    console.log(nota)
    useEffect(() => {
        setPuntaje(nota ? nota.nota : '');
        setEstudiante(nota ? nota.estudiante_id : '');
        setCurso(nota ? nota.curso_id : '');
        setPorcentaje(nota ? nota.porcentaje : '');
        setDescripcion(nota ? nota.descripcion : '');
        EstudianteService.getEstudiantes().then((data) => setEstudiantes(data));
        CursoService.getCurso().then((data) => setCursos(data));
    }, [nota]);

    const limpiar = () => {
        setPuntaje('')
        setEstudiante('')
        setCurso('')
        setPorcentaje('')
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        var notaPost: NotaPost = {
            nota: Number(puntaje),
            estudiante: estudiante,
            curso: Number(curso),
            porcentaje: Number(porcentaje),
            descripcion: descripcion,
        }

        if (nota) {
            // Accion para editar
            NotaService.putNota(nota.id, notaPost).then(response => {
                toast.success('La nota ha sido editado con éxito!');
            }).catch(error => {
                toast.error('Hubo un error al editar la nota');
            });
        } else {
            // Accion para crear
            NotaService.postNota(notaPost).then(response => {
                toast.success('La nota ha sido creado con éxito!');
            }).catch(error => {
                toast.error('Hubo un error al crear la nota');
            });
        }
        limpiar();
        onClose();
        actualizarDatos();
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-center">Formulario</h1>
            <div className="flex space-x-4">
                <div className="space-y-4 w-1/2">
                    <div className="block">
                        <span className="text-gray-700">Nota:</span>
                        <input type="number" value={puntaje} min={0} max={20} onChange={e => setPuntaje(e.target.value)} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div className="block">
                        <span className="text-gray-700">Estudiante:</span>
                        <select value={estudiante} onChange={e => setEstudiante(e.target.value)} disabled={!!nota} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm">
                            <option value="">
                                Seleccionar estudiante
                            </option>
                            {estudiantes.map((estudiante) => (
                                <option key={estudiante.id} value={estudiante.id}>
                                    {estudiante.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="block">
                        <span className="text-gray-700">Curso:</span>
                        <select value={curso} onChange={e => setCurso(e.target.value)} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm">
                            <option value="">
                                Seleccionar curso
                            </option>
                            {cursos.map((curso) => (
                                <option key={curso.id} value={curso.id}>
                                    {curso.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="block">
                        <span className="text-gray-700">Porcentaje:</span>
                        <input type="number" max={100} min={0} value={porcentaje} onChange={e => setPorcentaje(e.target.value)} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm" />
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="block">
                        <span className="text-gray-700">Descripción:</span>
                        <textarea
                            value={descripcion}
                            onChange={e => setDescripcion(e.target.value)}
                            className="py-2 mt-1 h-full w-full rounded-md border-gray-300 shadow-sm"
                            rows={11}
                            placeholder="Escribe una descripción aquí..."
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <button onClick={handleSubmit} className="my-2 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    {nota ? "Editar nota" : "Crear nota"}
                </button>
                <button onClick={() => { onClose(); limpiar(); }} className="my-2 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default NotaForm;