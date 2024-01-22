// AcceptApplication.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../SessionContext";

const AcceptApplication = () => {
  const { user, isLoggedIn } = useSession();
  const [data, setData] = useState([]); // Cambié el nombre de la variable a `data`
  const navigate = useNavigate();

  const handleReturnToMain = () => {
    navigate("/");
  };

  useEffect(() => {
    console.log("User:", user);
    if (!isLoggedIn) {
      console.error(
        "El usuario no está autenticado. Redirigiendo a la página de inicio de sesión."
      );
      navigate("/login");
    }
  }, [isLoggedIn, navigate, user]);

  useEffect(() => {
    obtenerFormulariosPendientes();
  }, []);

  const obtenerFormulariosPendientes = async () => {
    try {
      const response = await fetch("http://192.168.2.135:8000/pre-listado");
      if (response.ok) {
        const formularios = await response.json();
        console.log(formularios);
        // Filtrar las solicitudes que coinciden con el DNI del jefe y tienen estado pendiente
        const solicitudesPendientesDelJefe = formularios.filter(
          (formulario) =>
            formulario.autorizacion_jefe === user.dni &&
            formulario.estado === "pendiente"
        );

        setData(solicitudesPendientesDelJefe);
      } else {
        console.error("Error al obtener la lista de jefes");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleAceptarRechazar = async (id, dni, descripcion, fecha_retorno, autorizacion_jefe, aceptar) => {
    try {
      const response = await fetch(`http://192.168.2.135:8000/aprobacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          dni_usuario: dni,  // Añadido según la estructura del objeto que proporcionaste
          descripcion: descripcion,  // Añadido según la estructura del objeto
          fecha_retorno: fecha_retorno,  // Añadido según la estructura del objeto
          autorizacion_jefe: autorizacion_jefe,  // Añadido según la estructura del objeto
          estado: aceptar,  // Añadido según la estructura del objeto
        }),
        
      });

      if (response.ok) {
        // Actualizar la lista después de aceptar o rechazar
        obtenerFormulariosPendientes();
      } else {
        console.error("Error al realizar la solicitud de aprobación/rechazo");
        const responseBody = await response.json();
        console.error("Detalles del error:", responseBody);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  return (
    <>
      <Link to="/" onClick={handleReturnToMain}>
        Volver al menú principal
      </Link>

      <h1> Enlace a los Permisos </h1>

      <ul>
        {data.map((formulario, index) => (
          <li key={index}>
            <p>dni_usuario: {formulario.dni_usuario}</p>
            <p>Descripción: {formulario.descripcion}</p>
            <p>Fecha de creacion: {formulario.fecha_creada}</p>
            <p>Fecha de retorno: {formulario.fecha_retorno}</p>
            <p>Autorización Jefe: {formulario.autorizacion_jefe}</p>
            <p>Estado: {formulario.estado}</p>
            <button onClick={() => handleAceptarRechazar(formulario.id, formulario.dni_usuario, formulario.descripcion, formulario.fecha_retorno, formulario.autorizacion_jefe, "Aceptar")}>
              Aceptar
            </button>
            <button onClick={() => handleAceptarRechazar(formulario.id, formulario.dni_usuario, formulario.descripcion, formulario.fecha_retorno, formulario.autorizacion_jefe,  "Rechazar")}>
              Rechazar
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AcceptApplication;
