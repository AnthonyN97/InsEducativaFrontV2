import { useEffect, useState } from "react";
import { Nota } from "../types/Nota";
import { NotaService } from "../services/NotasApi";
import { toast } from "react-toastify";
import Formulario from "../components/Formulario";
import NotaForm from "../components/NotaForm";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";

const NotasPage = () => {
    const [datos, setDatos] = useState<Nota[]>([]);
    const [datosOriginales, setDatosOriginales] = useState<Nota[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [notaEditar, setNotaEditar] = useState<Nota | null>(null);
    const [busqueda, setBusqueda] = useState<string>('');
    const headers = [
        { label: 'Estudiante', key: 'estudiante' },
        { label: 'Curso', key: 'curso' },
        { label: 'Nota', key: 'nota' },
        { label: 'Porcentaje', key: 'porcentaje' },
    ];

    useEffect(() => {
        actualizarDatos()
        NotaService.getNota().then((data) => setDatosOriginales(data));
    }, [open]);

    const actualizarDatos = () => {
        NotaService.getNota().then((data) => setDatos(data));
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const consulta = event.target.value;
        console.log(consulta);
        setBusqueda(consulta);

        // Filtra los datos según la consulta de búsqueda
        const datosFiltrados = datosOriginales.filter((dato) =>
            dato.estudiante.toLowerCase().includes(consulta.toLowerCase())
        );

        // Actualiza el estado con los datos filtrados o todos los datos originales
        setDatos(consulta ? datosFiltrados : datosOriginales);
    };

    const handleDelete = (idNota: string, idEstudiante: string) => {
        Swal.fire({
            title: 'Eliminar',
            text: '¿Está seguro que desea borrar esta nota?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Borrar',
        }).then((result) => {
            if (result.isConfirmed) {
                NotaService.deleteNota(idNota, idEstudiante)
                    .then(response => {
                        console.log(response);
                        toast.success('La nota ha sido eliminado con éxito!');
                    })
                    .catch(error => {
                        console.error(error);
                        toast.error('Hubo un error al eliminar la nota');
                    });
                actualizarDatos()
                Swal.fire('Borrado', 'La nota ha sido eliminada con éxito', 'success');
            } else {
                Swal.fire('Cancelado', 'La nota no ha sido eliminada', 'info');
            }
        });

    };

    return (
        <>
            <div className="px-8 py-2 flex justify-end w-full">
                <input
                    type="text"
                    placeholder="Buscar alumnos"
                    value={busqueda}
                    onChange={handleSearch}
                />
                <button
                    className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white "
                    onClick={() => { setOpen(true); setNotaEditar(null) }}
                >
                    Crear Nota
                </button>
                <button
                    className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white ">
                    <CSVLink data={datos} headers={headers} filename={"notas.csv"}>
                    Descargar CSV
                    </CSVLink>
                </button>
                
                <Formulario open={open} onClose={() => setOpen(false)}>
                    <NotaForm open={open} nota={notaEditar} onClose={() => setOpen(false)} actualizarDatos={actualizarDatos} />
                </Formulario>
            </div>
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
                                                <button className="text-green-500 hover:text-green-700" onClick={() => { setNotaEditar(dato); setOpen(true); }}>
                                                    Editar
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(dato.id, dato.estudiante_id)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-3 gap-4">
                    {datos.map((dato: any, index: number) => (
                        <div key={index} className="bg-sky-200 m-5 shadow-lg rounded-lg border-8 border-blue-500">
                            <div className="p-4 text-xl font-bold text-justify">Nombre: {dato.estudiante}</div>
                            <div className="p-4 text-xl font-bold text-justify">Curso: {dato.curso}</div>
                            <div className="p-4 text-xl font-bold text-justify">Nota: {dato.nota}</div>
                            <div className="p-4 text-xl font-bold text-justify">Porcentaje: {dato.porcentaje}</div>
                            <div className="flex justify-end p-2">
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 h-8 mr-2"
                                    onClick={() => { setNotaEditar(dato); setOpen(true); }}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 h-8"
                                    onClick={() => handleDelete(dato.id, dato.estudiante_id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}

export default NotasPage;
