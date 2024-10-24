import React, { useEffect, useState } from "react";
import { Estudiante, EstudiantePost } from "../types/Estudiante";
import { EstudianteService } from "../services/EstudiantesApi";
import { toast } from "react-toastify";

type propTypes = {
    open: boolean;
    onClose: () => void;
    estudiante?: Estudiante | null
};
const EstudianteForm: React.FC<propTypes> = ({ onClose, estudiante }) => {
    const [nombre, setNombre] = useState(estudiante ? estudiante.nombre : '');
    const [sexo, setSexo] = useState(estudiante ? estudiante.sexo : '');
    const [grado, setGrado] = useState(estudiante ? estudiante.grado : '');
    const [seccion, setSeccion] = useState(estudiante ? estudiante.seccion : '');
    const [fechaNacimiento, setFechaNacimiento] = useState(estudiante ? estudiante.fecha_nacimiento : '');
    const [tipoSangre, setTipoSangre] = useState(estudiante ? estudiante.tipo_sangre : '');

    useEffect(() => {
        // Cuando el estudiante cambia, actualiza el estado del formulario
        setNombre(estudiante ? estudiante.nombre : '');
        setSexo(estudiante ? estudiante.sexo : '');
        setGrado(estudiante ? estudiante.grado : '');
        setSeccion(estudiante ? estudiante.seccion : '');
        setFechaNacimiento(estudiante ? estudiante.fecha_nacimiento : '');
        setTipoSangre(estudiante ? estudiante.tipo_sangre : '');
    }, [estudiante]);

    const limpiar = () => {
        setNombre('')
        setSexo('')
        setGrado('')
        setSeccion('')
        setFechaNacimiento('')
        setTipoSangre('')
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        var estudiantePost: EstudiantePost = {
            nombre: nombre,
            sexo: sexo,
            grado: grado,
            seccion: seccion,
            fecha_nacimiento: fechaNacimiento,
            tipo_sangre: tipoSangre
        }
        if (estudiante) {
            // Accion para editar
            EstudianteService.putEstudiantes(estudiante.id, estudiantePost).then(response => {
                toast.success('El estudiante ha sido editado con éxito!');
            }).catch(error => {
                toast.error('Hubo un error al editar el estudiante');
            });
        } else {
            // Accion para crear
            EstudianteService.postEstudiantes(estudiantePost).then(response => {
                toast.success('El estudiante ha sido creado con éxito!');
            }).catch(error => {
                toast.error('Hubo un error al crear el estudiante');
            });
        }
        limpiar();
        onClose();
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl text-center">Formulario</h1>
                <div className="space-y-4">
                    <div className="block">
                        <span className="text-gray-700">Nombre:</span>
                        <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div className="block">
                        <span className="text-gray-700">Sexo:</span>
                        <select value={sexo} onChange={(e) => setSexo(e.target.value)} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm">
                            <option value="">Selecciona</option>
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </div>
                    <div className="block">
                        <span className="text-gray-700">Grado:</span>
                        <select value={grado} onChange={(e) => setGrado(e.target.value)} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm">
                            <option value="">Selecciona</option>
                            <option value="1ro de primaria">Primero de Primaria</option>
                            <option value="2do de primaria">Segundo de Primaria</option>
                            <option value="3ro de primaria">Tercero de Primaria</option>
                            <option value="4to de primaria">Cuarto de Primaria</option>
                            <option value="5to de primaria">Quinto de Primaria</option>
                            <option value="6to de primaria">Sexto de Primaria</option>
                            <option value="1ro de secundaria">Primero de Secundaria</option>
                            <option value="2do de secundaria">Segundo de Secundaria</option>
                            <option value="3ro de secundaria">Tercero de Secundaria</option>
                            <option value="4to de secundaria">Cuarto de Secundaria</option>
                            <option value="5to de secundaria">Quinto de Secundaria</option>
                        </select>
                    </div>
                    <div className="block">
                        <span className="text-gray-700">Sección:</span>
                        <select value={seccion} onChange={(e) => setSeccion(e.target.value)} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm">
                            <option value="">Selecciona</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>
                    <div className="block">
                        <span className="text-gray-700">Fecha de Nacimiento:</span>
                        <input type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm" />
                    </div>
                    <div className="block">
                        <span className="text-gray-700">Tipo de Sangre:</span>
                        <select value={tipoSangre} onChange={(e) => setTipoSangre(e.target.value)} className="py-2 mt-1 block w-full text-center rounded-md border-gray-300 shadow-sm">
                            <option value="">Selecciona</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <hr className="border-t-solid border-1 border-grey" />
                    <button onClick={handleSubmit} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        {estudiante ? "Editar" : "Crear"}
                    </button>
                </div>
                <div className="flex flex-col justify-center">

                    <button onClick={() => { onClose(); limpiar(); }} className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        Cerrar
                    </button>
                </div>
            </div>
        </>
    );
};

export default EstudianteForm;