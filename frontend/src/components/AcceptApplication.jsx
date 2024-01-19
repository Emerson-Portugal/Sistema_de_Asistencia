//AcceptApplication.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { obtenerSolicitudesPendientes, aceptarRechazarSolicitud } from "./api";


const AcceptApplication = ({ onReturnToMain }) => {
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    obtenerFormulariosPendientes();
  }, []);

  const obtenerFormulariosPendientes = async () => {
    try {
      const formulariosPendientes = await obtenerSolicitudesPendientes();
      console.log("Respuesta de obtenerSolicitudesPendientes:", formulariosPendientes);
      setFormularios((formulariosPendientes && formulariosPendientes.solicitudes_pendientes) || []);
    } catch (error) {
      console.error("Error al obtener las solicitudes pendientes:", error);
    }
  };
  

  const handleReturnToMain = () => {
    onReturnToMain();
  };

  const handleAceptarRechazar = async (idSolicitud, aceptar) => {
    try {
      await aceptarRechazarSolicitud(idSolicitud, aceptar);
      obtenerFormulariosPendientes();
    } catch (error) {
      console.error("Error al aceptar/rechazar la solicitud:", error);
    }
  };

  return (
    <>
      <Link to="/" onClick={handleReturnToMain}>
        Volver al menú principal
      </Link>

      <h1> Enlace a los Permisos </h1>

      <ul>
        {formularios.map((formulario) => (
          <li key={formulario.id}>
            <p>ID: {formulario.id}</p>
            <p>Descripción: {formulario.descripcion}</p>
            <p>Fecha de retorno: {formulario.fecha_retorno}</p>
            <p>Autorización Jefe: {formulario.autorizacion_jefe}</p>
            <p>Autorización: {formulario.autorizacion}</p>
            <p>Respuesta Jefe: {formulario.respuesta_jefe}</p>

            <button onClick={() => handleAceptarRechazar(formulario.id, true)}>Aceptar</button>
            <button onClick={() => handleAceptarRechazar(formulario.id, false)}>Rechazar</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AcceptApplication;
