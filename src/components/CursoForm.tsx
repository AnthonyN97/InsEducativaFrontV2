import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Curso, CursoPost } from "../types/Curso";
import { CursoService } from "../services/CursosApi";

type propTypes = {
    open: boolean;
    onClose: () => void;
    curso?: Curso | null
};

const CursoForm: React.FC<propTypes> = ({ onClose, curso }) => {
    const [nombre, setNombre] = useState(curso ? curso.nombre : '');
    const [estudiantes, setEstudiantes] = useState(curso ? curso.estudiantes : '');

    useEffect(() => {
        setNombre(curso ? curso.nombre : '');
        setEstudiantes(curso ? curso.estudiantes : '');
    }, [curso]);

    const limpiar = () => {
        setNombre('')
        setEstudiantes('')
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
                console.log(response);
                toast.success('El curso ha sido editado con éxito!');
            }).catch(error => {
                toast.error('Hubo un error al editar el curso');
            });
        } else {
            // Accion para crear
            CursoService.postCurso(cursoPost).then(response => {
                console.log(response);
                toast.success('El curso ha sido creado con éxito!');
            }).catch(error => {
                toast.error('Hubo un error al crear el curso');
            });
        }
        limpiar();
        onClose();
    };

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl text-center">Formulario</h1>
            <div className="space-y-4">
                <div className="block">
                    <span className="text-gray-700">Nombre:</span>
                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div className="block">
                    <span className="text-gray-700">Estudiantes:</span>
                    <input type="text" value={estudiantes} onChange={e => setEstudiantes(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                
                <hr className="border-t-solid border-1 border-grey" />
                <button onClick={handleSubmit} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    {curso ? "Editar curso" : "Crear curso"}
                </button>
            </div>
            <div className="flex flex-col justify-center">

                <button onClick={() => { onClose(); limpiar(); }} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Close
                </button>
            </div>
        </div>
    );
};

export default CursoForm;