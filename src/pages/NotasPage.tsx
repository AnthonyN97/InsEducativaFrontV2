import { useEffect, useState } from "react";
import { Nota } from "../types/Nota";
import { NotaService } from "../services/NotasApi";
import { toast } from "react-toastify";
import Formulario from "../components/Formulario";
import NotaForm from "../components/NotaForm";

const NotasPage = () => {
    const [datos, setDatos] = useState<Nota[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [notaEditar, setNotaEditar] = useState<Nota | null>(null);

    useEffect(() => {
        NotaService.getNota().then((data) => setDatos(data));
    }, [open]);

    const handleDelete = (idNota: string, idEstudiante: string) => {
        NotaService.deleteNota(idNota, idEstudiante)
            .then(response => {
                console.log(response);
                toast.success('La nota ha sido eliminado con éxito!');
                NotaService.getNota().then((data) => setDatos(data));
            })
            .catch(error => {
                console.error(error);
                toast.error('Hubo un error al eliminar la nota');
            });
    };

    return (
        <>
            <div className="p-10 flex justify-center w-full">
                <button
                    className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white "
                    onClick={() => {setOpen(true); setNotaEditar(null)}}
                >
                    Crear Nota
                </button>
                <Formulario open={open} onClose={() => setOpen(false)}>
                    <NotaForm open={open} nota={notaEditar} onClose={() => setOpen(false)} />
                </Formulario>
            </div>
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
                                                <button className="text-green-500 hover:text-green-700" onClick={()=>{setNotaEditar(dato); setOpen(true);}}>
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
        </>
    );
}

export default NotasPage;
