from fastapi import APIRouter, HTTPException, Body
from app.db.queries import consultar_login
from pydantic import BaseModel

router = APIRouter()

class LoginForm(BaseModel):
    dni: int
    password: str

@router.post("/login")
async def login(login_data: LoginForm = Body(...)):
    dni = login_data.dni
    password = login_data.password

    usuario = consultar_login(dni, password)

    if usuario:
        return {"message": "Inicio de sesión exitoso", "usuario": usuario}
    else:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
