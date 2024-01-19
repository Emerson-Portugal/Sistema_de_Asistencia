from fastapi import APIRouter
from app.db.queries import obtener_lista_jefes

router = APIRouter()

@router.get("/jefes")
def obtener_jefes():
    jefes = obtener_lista_jefes()
    return jefes
