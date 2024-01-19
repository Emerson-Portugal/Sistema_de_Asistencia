// SupportForm.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SupportForm = ({ onSubmit, onReturnToMain, jefes }) => {
  const [descripcion, setDescripcion] = useState("");
  const [fechaRetorno, setFechaRetorno] = useState("");
  const [autorizacionJefe, setAutorizacionJefe] = useState("");
  const [cargoJefe, setCargoJefe] = useState("");

  const handleFormSubmit = () => {
    onSubmit({ descripcion, fechaRetorno, autorizacionJefe, cargoJefe });

    // Limpia los campos después de enviar el formulario
    setDescripcion("");
    setFechaRetorno("");
    setAutorizacionJefe("");
    setCargoJefe("");
  };

  const handleReturnToMain = () => {
    onReturnToMain();
  };

  return (
    <>
      <Link to="/" onClick={handleReturnToMain}>
        Volver al menú principal
      </Link>

      <h1> Enlace al Formulario </h1>

      <label>
        Descripción:
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Fecha de retorno:
        <input
          type="datetime-local"
          value={fechaRetorno}
          onChange={(e) => setFechaRetorno(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Autorización del jefe:
        <input
          type="text"
          value={autorizacionJefe}
          onChange={(e) => setAutorizacionJefe(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        Cargo del jefe:
        <select
          value={cargoJefe}
          onChange={(e) => setCargoJefe(e.target.value)}
          required
        >
          <option value="" disabled>
            Selecciona al jefe
          </option>
          {jefes &&
            jefes.map((jefe) => (
              <option key={jefe.dni} value={jefe.dni}>
                {`${jefe.nombre_cargo} - DNI: ${jefe.dni}`}
              </option>
            ))}
        </select>
      </label>
      <br />
      <button onClick={handleFormSubmit}>Enviar Formulario</button>
    </>
  );
};

export default SupportForm;
