import { DatosEstudiante } from "../types/BusquedaDatosEstudiante";

type propTypes = {
    open: boolean;
    onClose: () => void;
    datosEstudianteNotasProm: DatosEstudiante | null;
};

const MostrarNotasPadres: React.FC<propTypes> = ({ onClose, datosEstudianteNotasProm })=> {
    return (
        <div className="p-4">
            <h3 className="text-xl font-bold mb-4">Datos del Estudiante</h3>
            <p className="mb-4">Nombre: {datosEstudianteNotasProm?.estudiante}</p>
            <div className="grid grid-cols-2 gap-4">
                <div className="overflow-y-auto max-h-64 p-4 border rounded">
                    <h4 className="text-lg font-semibold mb-2">Notas</h4>
                    <ul>
                        {datosEstudianteNotasProm?.notas.map((nota, index) => (
                            <li key={index} className="mb-2">
                                <strong>Curso:</strong> {nota.curso} <br />
                                <strong>Nota:</strong> {nota.nota} <br />
                                <strong>Porcentaje:</strong> {nota.porcentaje}%
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="overflow-y-auto max-h-64 p-4 border rounded">
                    <h4 className="text-lg font-semibold mb-2">Promedios</h4>
                    <ul>
                        {datosEstudianteNotasProm?.promedios.map((promedio, index) => (
                            <li key={index} className="mb-2">
                                <strong>Curso:</strong> {promedio.curso} <br />
                                <strong>Promedio:</strong> {promedio.promedio}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MostrarNotasPadres;
