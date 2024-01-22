# pre_approval.py
from fastapi import APIRouter, HTTPException
from app.db.queries_approval import listado_pre_aprobacion, actualizar_aprobacion
from app.models.pre_form import SolicitudAsistenciaJefe

router = APIRouter()


@router.get("/pre-listado")
def listado_pre_aprobacion_solicitud():
    try:
        # Guardar la solicitud de pre-aprobación en la base de datos
        listado = listado_pre_aprobacion()
        return listado
    except Exception as e:
        # Manejar cualquier error que pueda ocurrir durante la inserción en la base de datos
        raise HTTPException(status_code=500, detail=f"Error al guardar la solicitud: {e}")



@router.post("/aprobacion")
def aprobacion_solicitud(solicitud: SolicitudAsistenciaJefe):
    try:
        # Guardar la solicitud de pre-aprobación en la base de datos
        actualizar_aprobacion(solicitud)
        return {"mensaje": "Solicitud de pre-aprobación guardada exitosamente"}
    except Exception as e:
        # Manejar cualquier error que pueda ocurrir durante la inserción en la base de datos
        raise HTTPException(status_code=500, detail=f"Error al guardar la solicitud: {e}")
