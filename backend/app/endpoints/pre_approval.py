# pre_approval.py
from fastapi import APIRouter, HTTPException
from app.db.queries_pre_approval import guardar_pre_aprobacion
from app.models.pre_form import SolicitudAsistencia

router = APIRouter()

@router.post("/pre-aprobacion")
def pre_aprobacion_solicitud(solicitud: SolicitudAsistencia):
    try:
        # Guardar la solicitud de pre-aprobación en la base de datos
        guardar_pre_aprobacion(solicitud)
        return {"mensaje": "Solicitud de pre-aprobación guardada exitosamente"}
    except Exception as e:
        # Manejar cualquier error que pueda ocurrir durante la inserción en la base de datos
        raise HTTPException(status_code=500, detail=f"Error al guardar la solicitud: {e}")
