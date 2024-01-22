import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../SessionContext";

const SupportForm = () => {
  const { user, isLoggedIn } = useSession();
  const [jefes, setJefes] = useState([]);
  const navigate = useNavigate();

  const [descripcion, setDescripcion] = useState("");
  const [fechaRetorno, setFechaRetorno] = useState("");
  const [cargoJefe, setCargoJefe] = useState("");

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
    obtenerJefes();
  }, []);

  const obtenerJefes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/jefes");
      if (response.ok) {
        const data = await response.json();
        setJefes(data);
      } else {
        console.error("Error al obtener la lista de jefes");
      }
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      if (!user || !user.dni) {
        console.error("El usuario o su DNI no está disponible.");
        return;
      }

      console.log("Valores enviados:", {
        dni_usuario: user.dni,
        descripcion,
        fecha_retorno: fechaRetorno,
        dni_jefe: cargoJefe,
      });

      const response = await fetch("http://127.0.0.1:8000/pre-aprobacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          dni_usuario: user.dni,
          descripcion,
          fecha_retorno: fechaRetorno,
          autorizacion_jefe: cargoJefe,
        }),
      });

      if (response.ok) {
        // Redirige al usuario a la ruta principal después de enviar el formulario con éxito
        navigate("/");
      } else {
        console.error("Error al enviar el formulario:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <>
      <Link to="/">Volver al menú principal</Link>

      <h1>Enlace al Formulario</h1>

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
        Jefe a Cargo:
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
