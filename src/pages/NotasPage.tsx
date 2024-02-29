import axios from "axios";
import { useEffect, useState } from "react";
import { Nota } from "../types/Nota";
import { getNotas } from "../services/NotasApi";

const NotasPage = () => {
    const [datos, setDatos] = useState<Nota[]>([]);

    useEffect(() => {
        getNotas().then(data => setDatos(data)).catch(error => console.log(error));
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
                                            Estudiante
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                        >
                                            Curso
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                        >
                                            Nota
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                        >
                                            Porcentaje
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
                                                {dato.estudiante}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 text-center">
                                                {dato.curso}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 text-center">
                                                {dato.nota}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 text-center">
                                                {dato.porcentaje}
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

export default NotasPage;
