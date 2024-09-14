import { useEffect, useState } from "react";
import { Estudiante } from "../types/Estudiante";
import Formulario from "../components/Formulario";
import { EstudianteService } from "../services/EstudiantesApi";
import EstudianteForm from "../components/EstudianteForm";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";

const EstudiantesPage = () => {
    const [datos, setDatos] = useState<Estudiante[]>([]);
    const [datosOriginales, setDatosOriginales] = useState<Estudiante[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [estudianteEditar, setEstudianteEditar] = useState<Estudiante | null>(null);
    const [busqueda, setBusqueda] = useState<string>('');
    const headers = [
        { label: 'Nombre', key: 'nombre' },
        { label: 'Sexo', key: 'sexo' },
        { label: 'Grado', key: 'grado' },
        { label: 'Seccion', key: 'seccion' },
        { label: 'Fecha de Nac.', key: 'fecha_nacimiento' },
        { label: 'Tipo de Sangre', key: 'tipo_sangre' },
    ];

    useEffect(() => {
        actualizarDatos()
        EstudianteService.getEstudiantes().then((data) => setDatosOriginales(data));
    }, [open]);

    const actualizarDatos = () => {
        EstudianteService.getEstudiantes().then((data) => setDatos(data));
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const consulta = event.target.value;
        console.log(consulta);
        setBusqueda(consulta);
      
        // Filtra los datos según la consulta de búsqueda
        const datosFiltrados = datosOriginales.filter((dato) =>
          dato.nombre.toLowerCase().includes(consulta.toLowerCase())
        );
      
        // Actualiza el estado con los datos filtrados o todos los datos originales
        setDatos(consulta ? datosFiltrados : datosOriginales);
      };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Eliminar',
            text: '¿Está seguro que desea borrar esta nota?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Borrar',
        }).then((result) => {
            if (result.isConfirmed) {
                EstudianteService.deleteEstudiantes(id)
                    .then(response => {
                        console.log(response);
                        toast.success('El estudiante ha sido eliminado con éxito!');
                        EstudianteService.getEstudiantes().then((data) => setDatos(data));
                    })
                    .catch(error => {
                        console.error(error);
                        toast.error('Hubo un error al eliminar el estudiante');
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
                    onClick={() => { setOpen(true); setEstudianteEditar(null) }}
                >
                    Crear Estudiante
                </button>
                <button
                    className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white ">
                    <CSVLink data={datos} headers={headers} filename={"notas.csv"}>
                    Descargar CSV
                    </CSVLink>
                </button>
                <Formulario open={open} onClose={() => setOpen(false)}>
                    <EstudianteForm open={open} estudiante={estudianteEditar} onClose={() => setOpen(false)} />
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
                                            Grado
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                                        >
                                            Sección
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
                                                {dato.grado}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 text-center">
                                                {dato.seccion}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 text-center">
                                                {dato.fecha_nacimiento}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-800 text-center">
                                                {dato.tipo_sangre}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-center">
                                                <button className="text-green-500 hover:text-green-700" onClick={() => { setEstudianteEditar(dato); setOpen(true); }}>
                                                    Editar
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(dato.id)}>
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
        </>
    );
};


export default EstudiantesPage;