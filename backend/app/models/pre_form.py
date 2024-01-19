# pre_form.py
from pydantic import BaseModel

class SolicitudAsistencia(BaseModel):
    dni_usuario: int
    descripcion: str
    fecha_retorno: str
    autorizacion_jefe: int
