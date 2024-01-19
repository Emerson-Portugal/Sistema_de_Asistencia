from fastapi import APIRouter, Body
from app.db.queries import insertar_formulario, enviar_solicitud_asistencia, obtener_respuesta_del_jefe, obtener_solicitud
from pydantic import BaseModel
from datetime import datetime

router = APIRouter()

class FormularioCreate(BaseModel):
    dni_usuario: int
    descripcion: str
    fecha_retorno: datetime
    autorizacion_jefe: str
    cargo_jefe: str

@router.post("/asistencia")
async def crear_formulario(formulario_data: FormularioCreate = Body(...)):
    dni_usuario = formulario_data.dni_usuario
    descripcion = formulario_data.descripcion
    fecha_retorno = formulario_data.fecha_retorno
    autorizacion_jefe = formulario_data.autorizacion_jefe
    cargo_jefe = formulario_data.cargo_jefe

    # Insertar datos del formulario en la base de datos
    id_solicitud = insertar_formulario(dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, cargo_jefe)

    # Enviar solicitud al jefe correspondiente y obtener la respuesta
    respuesta_jefe = enviar_solicitud_asistencia(dni_usuario, descripcion, fecha_retorno, autorizacion_jefe, cargo_jefe)

    return {"message": "Formulario de asistencia creado exitosamente", "id_solicitud": id_solicitud, "respuesta_jefe": respuesta_jefe}



@router.get("/respuesta-jefe/{id_formulario}")
async def obtener_respuesta_jefe(id_formulario: int):
    # Obtener la respuesta del jefe desde la base de datos
    respuesta_jefe = obtener_respuesta_del_jefe(id_formulario)

    if respuesta_jefe is not None:
        return {"respuesta_jefe": respuesta_jefe}
    else:
        return {"message": "No se encontró la respuesta del jefe"}


@router.get("/solicitud/{id_solicitud}")
async def obtener_detalle_solicitud(id_solicitud: int):
    # Obtener la información detallada de la solicitud desde la base de datos
    solicitud = obtener_solicitud(id_solicitud)

    if solicitud is not None:
        return {"solicitud": solicitud}
    else:
        return {"message": "No se encontró la solicitud"}