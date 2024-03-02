import { useEffect, useState } from "react";
import { Curso } from "../types/Curso";
import { CursoService } from "../services/CursosApi";
import { toast } from "react-toastify";
import Formulario from "../components/Formulario";
import CursoForm from "../components/CursoForm";

const CursosPage = () => {
    const [datos, setDatos] = useState<Curso[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [cursoEditar, setCursoEditar] = useState<Curso | null>(null);

    useEffect(() => {
        CursoService.getCurso().then(data => setDatos(data)).catch(error => console.log(error));
    }, [open]);

    const handleDelete = (id: string) => {
        CursoService.deleteCurso(id)
          .then(response => {
            console.log(response);
            toast.success('El curso ha sido eliminado con éxito!');
            CursoService.getCurso().then((data) => setDatos(data));
          })
          .catch(error => {
            console.error(error);
            toast.error('Hubo un error al eliminar el curso');
          });
      };

    return (
        <>
        <div className="p-10 flex justify-center w-full">
                <button
                    className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white "
                    onClick={() => {setOpen(true); setCursoEditar(null)}}
                >
                    Crear Curso
                </button>
                <Formulario open={open} onClose={() => setOpen(false)}>
                    <CursoForm open={open} curso={cursoEditar} onClose={() => setOpen(false)}/>
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
                                                {dato.estudiantes}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-center">
                                                <button className="text-green-500 hover:text-green-700" onClick={()=>{setCursoEditar(dato); setOpen(true);}}>
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
        </>
    );
}

export default CursosPage;
