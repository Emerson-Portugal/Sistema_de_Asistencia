// ListApproval.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../SessionContext";

const ListApproval = () => {
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
        
        // Filtrar las solicitudes que coinciden con el DNI del jefe y tienen estado pendiente
        const solicitudesPendientesDelJefe = formularios.filter(
          (formulario) => formulario.dni_usuario === user.dni
        );

        setData(solicitudesPendientesDelJefe);
      } else {
        console.error("Error al obtener la lista de jefes");
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

      <h1> Lista de Permisos </h1>

      <ul>
        {data.map((formulario, index) => (
          <li key={index}>
            <p>dni_usuario: {formulario.dni_usuario}</p>
            <p>Descripción: {formulario.descripcion}</p>
            <p>Fecha de creacion: {formulario.fecha_creada}</p>
            <p>Fecha de retorno: {formulario.fecha_retorno}</p>
            <p>Autorización Jefe: {formulario.autorizacion_jefe}</p>
            <p>Estado: {formulario.estado}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListApproval;
