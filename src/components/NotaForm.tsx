import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Nota, NotaPost } from "../types/Nota";
import { NotaService } from "../services/NotasApi";

type propTypes = {
    open: boolean;
    onClose: () => void;
    nota?: Nota | null
};

const NotaForm: React.FC<propTypes> = ({ onClose, nota }) => {
    const [puntaje, setPuntaje] = useState(nota ? nota.nota : '');
    const [estudiante, setEstudiante] = useState(nota ? nota.estudiante : '');
    const [curso, setCurso] = useState(nota ? nota.curso : '');
    const [porcentaje, setPorcentaje] = useState(nota ? nota.porcentaje: '');

    useEffect(() => {
        setPuntaje(nota ? nota.nota : '');
        setEstudiante(nota ? nota.estudiante : '');
        setCurso(nota ? nota.curso : '');
        setPorcentaje(nota ? nota.porcentaje : '');
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
            curso: curso,
            porcentaje: Number(porcentaje)
        }
        if (nota) {
            // Accion para editar
            NotaService.putNota(nota.id, notaPost).then(response => {
                console.log(response);
                toast.success('La nota ha sido editado con éxito!');
            }).catch(error => {
                toast.error('Hubo un error al editar la nota');
            });
        } else {
            // Accion para crear
            NotaService.postNota(notaPost).then(response => {
                console.log(response);
                toast.success('La nota ha sido creado con éxito!');
            }).catch(error => {
                toast.error('Hubo un error al crear la nota');
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
                    <span className="text-gray-700">Nota:</span>
                    <input type="text" value={puntaje} onChange={e => setPuntaje(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div className="block">
                    <span className="text-gray-700">Estudiante:</span>
                    <input type="text" value={estudiante} onChange={e => setEstudiante(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div className="block">
                    <span className="text-gray-700">Curso:</span>
                    <input type="text" value={curso} onChange={e => setCurso(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                <div className="block">
                    <span className="text-gray-700">Porcentaje:</span>
                    <input type="text" value={porcentaje} onChange={e => setPorcentaje(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                </div>
                
                <hr className="border-t-solid border-1 border-grey" />
                <button onClick={handleSubmit} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    {nota ? "Editar nota" : "Crear nota"}
                </button>
            </div>
            <div className="flex flex-col justify-center">

                <button onClick={() => { onClose(); limpiar();  }} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default NotaForm;