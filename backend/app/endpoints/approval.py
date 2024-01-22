# pre_approval.py
from fastapi import APIRouter, HTTPException
from app.db.queries_approval import listado_pre_aprobacion, actualizar_aprobacion
from app.models.pre_form import SolicitudAsistenciaJefe

router = APIRouter()

@router.get("/pre-listado")
def listado_pre_aprobacion_solicitud():
    try:
        listado = listado_pre_aprobacion()
        return listado
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener el listado de pre-aprobación: {e}")

@router.post("/aprobacion")
def aprobacion_solicitud(solicitud: SolicitudAsistenciaJefe):
    try:
        actualizar_aprobacion(solicitud)
        return {"mensaje": "Solicitud de pre-aprobación actualizada exitosamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar la solicitud de aprobación: {e}")
