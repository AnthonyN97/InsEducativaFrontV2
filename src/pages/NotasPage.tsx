import { useEffect, useState } from "react";
import { Nota } from "../types/Nota";
import { NotaService } from "../services/NotasApi";
import { toast } from "react-toastify";
import Formulario from "../components/Formulario";
import NotaForm from "../components/NotaForm";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";
import FileUpload from "../components/FileUpdate";

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
        { label: 'Descripcion', key: 'descripcion' },
    ];
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
        NotaService.getNota().then((data) => setDatosOriginales(data));
    }, [open]);

    const actualizarDatos = () => {
        NotaService.getNota().then((data) => setDatos(data));
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const consulta = event.target.value;
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
            confirmButtonColor: '#28A745',
            cancelButtonColor: '#DC3545',
            confirmButtonText: 'Borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                NotaService.deleteNota(idNota, idEstudiante)
                    .then(response => {
                        toast.success('La nota ha sido eliminado con éxito!');
                    })
                    .catch(error => {
                        console.error(error);
                        toast.error('Hubo un error al eliminar la nota');
                    });
                Swal.fire({
                    title: 'Borrado',
                    text: 'La nota ha sido eliminada con éxito',
                    icon: 'success',
                    confirmButtonColor: '#28A745',
                })
                actualizarDatos()
            } else {
                Swal.fire({
                    title: 'Cancelado',
                    text: 'La nota no ha sido eliminada',
                    icon: 'info',
                    confirmButtonColor: '#28A745',
                })
            }
        });
        actualizarDatos();
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
                <FileUpload></FileUpload>

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
                                            Descripción
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
                                    {currentItems.map((dato: any, index: number) => (
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
                                            <td className="px-6 py-4 text-sm text-gray-800 text-center max-w-xs">
                                                {dato.descripcion}

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

export default NotasPage;
