import axios from "axios";
import { useEffect, useState } from "react";
import { Estudiante } from "../types/Estudiante";
import { getEstudiantes } from "../services/EstudiantesApi";

const EstudiantesPage = () => {
    const [datos, setDatos] = useState<Estudiante[]>([]);

    useEffect(() => {
        getEstudiantes().then(data => setDatos(data)).catch(error => console.log(error));
    }, []);
    return (
        <>
            <div className="flex flex-col p-5">
                <div className="overflow-x-auto">
                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-x-auto border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                        >
                                            Nombre
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                        >
                                            Sexo
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                        >
                                            Fecha de Nacimiento
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                        >
                                            Tipo de Sangre
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                        >
                                            Editar
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                        >
                                            Eliminar
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {datos.map((dato: any, index: number) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 text-sm text-gray-800 text-left ">
                                                {dato.nombre}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 text-center">
                                                {dato.sexo}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 text-center">
                                                {dato.fecha_nacimiento}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 text-center">
                                                {dato.tipo_sangre}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-center">
                                                <a className="text-green-500 hover:text-green-700" href="#">
                                                    Edit
                                                </a>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                <a className="text-red-500 hover:text-red-700" href="#">
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EstudiantesPage;
