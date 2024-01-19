// api.js
const BASE_URL = "http://127.0.0.1:8000";  // Actualiza con la URL de tu backend




export const obtenerSolicitudesPendientes = async () => {
  const response = await fetch(`${BASE_URL}/solicitudes-pendientes`);
  if (response.ok) {
    const data = await response.json();
    return data.solicitudes_pendientes;
  } else {
    throw new Error("Error al obtener solicitudes pendientes");
  }
};

export const aceptarRechazarSolicitud = async (idSolicitud, aceptar) => {
  const response = await fetch(`${BASE_URL}/aceptar-rechazar/${idSolicitud}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ aceptar }),
  });

  if (!response.ok) {
    throw new Error("Error al aceptar/rechazar la solicitud");
  }
};
