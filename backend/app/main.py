# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.endpoints import login
from app.endpoints import pre_approval
from app.endpoints import approval
from app.endpoints import chief
app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost:5173",  # Ajusta esto con el puerto correcto de tu aplicación React
    "http://localhost:3000",  # Puedes añadir más orígenes según tus necesidades
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Montar el router

app.include_router(login.router)
app.include_router(pre_approval.router)
app.include_router(approval.router)
app.include_router(chief.router)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
