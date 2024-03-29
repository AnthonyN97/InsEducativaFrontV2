import { useEffect, useState } from "react";
import { Promedios } from "../types/Promedios";
import { PromedioService } from "../services/PromediosApi";

const PromediosPage = () => {
    const [datos, setDatos] = useState<Promedios[]>([]);

    useEffect(() => {
        PromedioService.getPromedio().then(data => setDatos(data)).catch(error => console.log(error));
    }, []);

    return (
        <>
            <div className="flex flex-col p-5 mx-5">
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
                                            Promedio
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                        >
                                            Curso
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
                                                {String(dato.promedios)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {datos.map((dato: any, index: number) => (
                <div className="container mx-auto p-4">
                    <div className="bg-sky-200 m-5 shadow-lg rounded-lg border-8 border-blue-500">
                        <div className="p-4 text-2xl font-bold text-center uppercase">Nombre: {dato.nombre}</div>
                        <div className="p-4 text-2xl font-bold text-center uppercase">Promedios:</div>
                        {
                            <div className="card-body p-4 grid grid-cols-3 gap-4">
                                {dato.promedios.map((promedio: any, index: number) => (
                                    <div className="bg-white grid grid-cols-2 gap-4 rounded-lg border border-gray-300">
                                        <div className="py-2 px-5 text-xl font-medium text-justify">Curso: </div>
                                        <div className="p-2 text-xl font-medium text-center">{promedio.curso}</div>
                                        <div className="py-2 px-5 text-xl font-medium text-justify">Promedio: </div>
                                        <div className="p-2 text-xl font-medium text-center">{promedio.promedio} </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            ))}
        </>
    );
}

export default PromediosPage;
