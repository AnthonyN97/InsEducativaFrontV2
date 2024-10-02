import { useState } from 'react';
import Formulario from './Formulario';
import MostrarNotasPadres from './MostrarNotasPadres';
import { NotaPromIDService} from '../services/NotaPromIDApi';
import { DatosEstudiante } from '../types/BusquedaDatosEstudiante';


const BuscarNotasPorPadres = () => {
    const [studentId, setStudentId] = useState('');
    const [datos, setDatos] = useState<DatosEstudiante | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSearch = async (ID: string) => {
        setError(null); // Reset error state
        const data = await NotaPromIDService.postPromedioById(studentId);
        if (data) {
            setDatos(data)
            setOpen(true);
        } else {
            setError('No se encontraron datos para el ID proporcionado.');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen flex flex-col'>
            <h2>Buscar por código de Estudiante</h2>
            <input
                type="text"
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                placeholder="Ingrese el ID del estudiante"
            />
            <button
                className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => handleSearch(studentId)}
            >
                Buscar
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <Formulario open={open} onClose={() => setOpen(false)} >
                <MostrarNotasPadres open={open} onClose={() => setOpen(false)} datosEstudianteNotasProm={datos}/>
            </Formulario>
        </div>
    );
};

export default BuscarNotasPorPadres;
