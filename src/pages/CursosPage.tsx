import { useEffect, useState } from "react";
import { Curso } from "../types/Curso";
import { CursoService } from "../services/CursosApi";
import { toast } from "react-toastify";
import Formulario from "../components/Formulario";
import CursoForm from "../components/CursoForm";
import Swal from "sweetalert2";

const CursosPage = () => {
    const [datos, setDatos] = useState<Curso[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [cursoEditar, setCursoEditar] = useState<Curso | null>(null);

    useEffect(() => {
        actualizarDatos()
    }, [open]);

    const actualizarDatos = () => {
        CursoService.getCurso().then(data => setDatos(data)).catch(error => console.log(error));
    }

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Eliminar',
            text: '¿Está seguro que desea borrar esta nota?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Borrar',
        }).then((result) => {
            if (result.isConfirmed) {
                CursoService.deleteCurso(id)
                    .then(response => {
                        console.log(response);
                        toast.success('El curso ha sido eliminado con éxito!');
                    })
                    .catch(error => {
                        console.error(error);
                        toast.error('Hubo un error al eliminar el curso');
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
                <button
                    className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white "
                    onClick={() => { setOpen(true); setCursoEditar(null) }}
                >
                    Crear Curso
                </button>
                <Formulario open={open} onClose={() => setOpen(false)}>
                    <CursoForm open={open} curso={cursoEditar} actualizarDatos={actualizarDatos} onClose={() => setOpen(false)} />
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
                                            Estudiantes
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
                                                {dato.estudiantes.map((estudiante: any, index: number) => (
                                                    estudiante.nombre
                                                ))}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-center">
                                                <button className="text-green-500 hover:text-green-700" onClick={() => { setCursoEditar(dato); setOpen(true); }}>
                                                    Editar
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-center whitespace-nowrap">
                                                <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(dato.id)}>
                                                    Delete
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
            {datos.map((dato: any, index: number) => (
                <div className="container mx-auto p-4">
                    <div className="card bg-sky-200 m-5 shadow-lg rounded-lg border-8 border-blue-500">
                        <div className="card-header p-4 text-2xl font-bold text-center uppercase">Nombre: {dato.nombre}</div>
                        <div className="card-header p-4 text-2xl font-bold text-center uppercase">Estudiantes:</div>
                        {dato.estudiantes.length > 0 ? (
                            <div className="card-body p-4 grid grid-cols-3 gap-4">
                                {dato.estudiantes.map((estudiante: any, index: number) => (
                                    <div className="student bg-white rounded-lg border border-gray-300">
                                        <div className="student-name p-2 text-xl font-medium text-center">{estudiante.nombre}</div>
                                    </div>
                                ))}
                            </div>) : (
                            <p className="text-center">Ningun estudiante tiene notas en este curso</p>
                        )}
                        <div className="flex justify-end p-2">
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 h-8 mr-2"
                                onClick={() => { setCursoEditar(dato); setOpen(true); }} >
                                Editar
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white rounded-full px-4 h-8"
                                onClick={() => handleDelete(dato.id)}>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default CursosPage;
