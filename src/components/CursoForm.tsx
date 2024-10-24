import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Curso, CursoPost } from "../types/Curso";
import { CursoService } from "../services/CursosApi";
import { Estudiante } from "../types/Curso";
import { EstudianteService } from "../services/EstudiantesApi";

type propTypes = {
    open: boolean;
    onClose: () => void;
    curso?: Curso | null
    actualizarDatos: () => void;
};

const CursoForm: React.FC<propTypes> = ({ onClose, curso, actualizarDatos}) => {
    const [nombre, setNombre] = useState(curso ? curso.nombre : '');
    const [estudiante, setEstudiante] = useState<string[]>([]);
    const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])

    useEffect(() => {
        setNombre(curso ? curso.nombre : '');
        EstudianteService.getEstudiantes().then((data) => setEstudiantes(data));
        if (curso) {
            const estudianteIds = curso.estudiantes.map((estudiante: Estudiante) => estudiante.id);
            setEstudiante(estudianteIds);
          }
    }, [curso]);

    const limpiar = () => {
        setNombre('')
        setEstudiantes([])
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        var cursoPost: CursoPost = {
            nombre: nombre,
            estudiantes: [],
        }
        if (curso) {
            // Accion para editar
            CursoService.putCurso(curso.id, cursoPost).then(response => {
                toast.success('El curso ha sido editado con éxito!');
            }).catch(error => {
                toast.error('Hubo un error al editar el curso');
            });
        } else {
            // Accion para crear
            CursoService.postCurso(cursoPost).then(response => {
                toast.success('El curso ha sido creado con éxito!');
            }).catch(error => {
                toast.error('Hubo un error al crear el curso');
            });
        }
        limpiar();
        onClose();
        actualizarDatos();
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-center">Formulario</h1>
            <div className="space-y-4">
                <div className="block">
                    <span className="text-gray-700">Nombre:</span>
                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm" />
                </div>
                <div className="block">
                    <span className="text-gray-700">Estudiantes:</span>
                    <select multiple value={estudiante} disabled={Boolean(curso)} onChange={e => setEstudiante(Array.from(e.target.selectedOptions, option => option.value))} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm">
                        {estudiantes.map((estudiante) => (
                            <option key={estudiante.id} value={estudiante.id}>
                                {estudiante.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <hr className="border-t-solid border-1 border-grey" />
                <button onClick={handleSubmit} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    {curso ? "Editar curso" : "Crear curso"}
                </button>
            </div>
            <div className="flex flex-col justify-center">

                <button onClick={() => { onClose(); limpiar(); }} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default CursoForm;