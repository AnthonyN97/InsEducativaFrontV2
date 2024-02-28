import axios from 'axios';
import React, { useState } from 'react';

const FormularioEstudiante = () => {
  const [nombre, setNombre] = useState('');
  const [sexo, setSexo] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [tipoSangre, setTipoSangre] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para crear el estudiante
    console.log({ nombre, sexo, fechaNacimiento, tipoSangre });

    axios.post('http://127.0.0.1:8000/estudiante', { nombre, sexo, fechaNacimiento, tipoSangre }).then(response => {
        console.log(response)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </label>
      <label>
        Sexo:
        <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
          <option value="">Selecciona</option>
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
        </select>
      </label>
      <label>
        Fecha de Nacimiento:
        <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
      </label>
      <label>
        Tipo de Sangre:
        <select value={tipoSangre} onChange={(e) => setTipoSangre(e.target.value)}>
          <option value="">Selecciona</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </label>
      <input type="submit" value="Crear Estudiante" />
    </form>
  );
};

export default FormularioEstudiante;
