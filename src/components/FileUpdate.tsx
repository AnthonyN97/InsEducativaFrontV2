import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Formulario from './Formulario';
import Swal from 'sweetalert2';
import { NotaService } from '../services/NotasApi';
import { NotaPost } from '../types/Nota';
import { toast } from 'react-toastify';

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [jsonData, setJsonData] = useState<NotaPost[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files ? e.target.files[0] : null;
        setFile(uploadedFile);
    };

    const handleFileSubmit = async () => {

        if (!file) {
            Swal.fire("¿Subiste correctamente tu archivo?", "Verifica tu archivo, ¿Tal vez no hay ninguno?", 'question');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target?.result;
            if (!data) return;

            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const rawData = XLSX.utils.sheet_to_json(sheet);

            const formattedData: NotaPost[] = rawData.map((item: any) => ({
                estudiante: item["Estudiante"],
                curso: item["Curso"],
                nota: Number(item["Nota"]) || 0,
                porcentaje: Number(item["Porcentaje"]) || 0
            }));

            setJsonData(formattedData);
            setOpen(true);
        };

        reader.readAsBinaryString(file);
    };

    const handleNotaSubmit = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Estás a punto de subir las notas. Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, subir notas',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                NotaService.postNotasGroup(jsonData).then(response => {
                    if (response) {
                        toast.success('¡Las notas han sido creadas con éxito!');
                    } else {
                        toast.error('Hubo un error al crear las notas');
                    }
                }).catch(error => {
                    if (error.response && error.response.status === 400) {
                        const errorMessage = error.response.data ? error.response.data.detail || 'Error al procesar la solicitud' : 'Error al crear las notas';
                        toast.error(`Hubo un error: ${errorMessage}`);
                    } else {
                        toast.error('Hubo un error al subir las notas');
                    }
                });
            }
        });
    };

    return (
        <div>
            <input className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white "
                type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            <button className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white "
                onClick={handleFileSubmit}>
                Previsualizar archivo
            </button>
            {jsonData.length > 0 && (
                <Formulario open={open} onClose={() => setOpen(false)}>
                    <h2 className="text-xl font-bold mb-4">Notas a agregar:</h2>
                    <table className="table-auto w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 border">Estudiante</th>
                                <th className="px-4 py-2 border">Curso</th>
                                <th className="px-4 py-2 border">Nota</th>
                                <th className="px-4 py-2 border">Porcentaje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jsonData.map((nota, index) => (
                                <tr key={index} className="bg-white">
                                    <td className="px-4 py-2 border">{nota.estudiante}</td>
                                    <td className="px-4 py-2 border">{nota.curso}</td>
                                    <td className="px-4 py-2 border">{nota.nota}</td>
                                    <td className="px-4 py-2 border">{nota.porcentaje}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mx-2"
                        onClick={handleNotaSubmit}>
                        Subir notas
                    </button>
                    <button
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={() => setOpen(false)}
                    >
                        Cancelar
                    </button>
                </Formulario>
            )}
        </div>
    );
};

export default FileUpload;

