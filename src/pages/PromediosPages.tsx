import { useEffect, useState } from "react";
import { Promedios } from "../types/Promedios";
import { PromedioService } from "../services/PromediosApi";
import React from "react";
import { CSVLink } from "react-csv";

const PromediosPage = () => {
    const [datos, setDatos] = useState<Promedios[]>([]);
    const [datosCSV, setDatosCSV] = useState<any[]>([]);
    const [datosOriginales, setDatosOriginales] = useState<Promedios[]>([]);
    const [busqueda, setBusqueda] = useState<string>('');
    //seccion de paginado
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const offset = currentPage * itemsPerPage;
    const currentItems = datos.slice(offset, offset + itemsPerPage);

    const totalPages = Math.ceil(datos.length / itemsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };
    //seccion de paginado terminada

    useEffect(() => {
        actualizarDatos()
        PromedioService.getPromedio().then((data: Promedios[]) => {
            setDatosOriginales(data);
            const transformedData = data.flatMap(dato =>
                dato.promedios ? dato.promedios.map(promedio => ({
                    estudiante: dato.nombre,
                    seccion: dato.seccion,
                    grado: dato.grado,
                    curso: promedio.curso,
                    promedio: promedio.promedio
                })) : []
            );
            setDatosCSV(transformedData);
        })
            .catch(error => console.log(error));
    }, []);

    const actualizarDatos = () => {
        PromedioService.getPromedio().then((data) => setDatos(data));
    };

    const headers = [
        { label: 'Estudiante', key: 'estudiante' },
        { label: 'Grado', key: 'grado' },
        { label: 'Seccion', key: 'seccion' },
        { label: 'Curso', key: 'curso' },
        { label: 'Promedio', key: 'promedio' },
    ];

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const consulta = event.target.value;
        setBusqueda(consulta);

        // Filtra los datos según la consulta de búsqueda
        const datosFiltrados = datosOriginales.filter((dato) =>
            dato.grado.toLowerCase().includes(consulta.toLowerCase())
        );

        // Actualiza el estado con los datos filtrados o todos los datos originales
        setDatos(consulta ? datosFiltrados : datosOriginales);
    };

    return (
        <>
            <div className="px-8 py-2 flex justify-end w-full">
                <input
                    type="text"
                    placeholder="Buscar Grado"
                    value={busqueda}
                    onChange={handleSearch}
                />
                <button
                    className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white ">
                    <CSVLink data={datosCSV} headers={headers} filename={"promedios.csv"}>
                        Descargar CSV
                    </CSVLink>
                </button>
            </div>
            <div className="container mx-auto p-4">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Nombre</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Grado</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Seccion</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Curso</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left">Promedio</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {currentItems.map((dato: any, index: number) => (
                            <React.Fragment key={index}>
                                {dato.promedios.length > 0 ? (
                                    dato.promedios.map((promedio: any, subIndex: number) => (
                                        <tr key={subIndex}>
                                            {subIndex === 0 && (
                                                <>
                                                    <td className="py-2 px-4 border-b border-gray-300" rowSpan={dato.promedios.length}>
                                                        {dato.nombre}
                                                    </td>
                                                    <td className="py-2 px-4 border-b border-gray-300" rowSpan={dato.promedios.length}>
                                                        {dato.grado}
                                                    </td>
                                                    <td className="py-2 px-4 border-b border-gray-300" rowSpan={dato.promedios.length}>
                                                        {dato.seccion}
                                                    </td>
                                                </>
                                            )}
                                            <td className="py-2 px-4 border-b border-gray-300">{promedio.curso}</td>
                                            <td className="py-2 px-4 border-b border-gray-300">{parseFloat(promedio.promedio).toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="py-2 px-4 border-b border-gray-300">{dato.nombre}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{dato.grado}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{dato.seccion}</td>
                                        <td className="py-2 px-4 border-b border-gray-300" colSpan={2}>No hay promedios</td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="container mx-auto p-4">
                <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index)}
                            className={index === currentPage ? 'px-4 py-2 mx-1 text-white bg-blue-700 rounded' : 'px-4 py-2 mx-1 text-white bg-blue-500 rounded hover:bg-blue-700'}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default PromediosPage;
