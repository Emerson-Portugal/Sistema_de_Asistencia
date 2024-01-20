# login.py
from fastapi import APIRouter, HTTPException, Body, Depends
from app.db.queries_login import consultar_login
from pydantic import BaseModel
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext

router = APIRouter()

SECRET_KEY = "83daa0256a2289b0fb23693bf1f6034d44396675749244721a2b20e896e11662"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str or None = None

class LoginForm(BaseModel):
    dni: int
    password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    return token_data

def get_current_active_user(current_user: TokenData = Depends(get_current_user)):
    # Implementa la lógica para verificar si el usuario está activo o no.
    # En este ejemplo, se asume que todos los usuarios son activos.
    if current_user.is_active:
        print("Esta Activo")
        return current_user
    
    raise HTTPException(status_code=400, detail="Usuario inactivo")


@router.post("/login", response_model=Token)
async def login(login_data: LoginForm = Body(...)):
    dni = login_data.dni
    password = login_data.password

    usuario = consultar_login(dni, password)

    if usuario:
        # Crear un token JWT
        token_data = {"sub": str(usuario["dni"]), "scopes": []}
        access_token = create_access_token(token_data)

        return {"access_token": access_token, "token_type": "bearer"}
    else:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")

@router.get("/users/me", response_model=TokenData)
async def read_users_me(current_user: TokenData = Depends(get_current_active_user)):
    return current_user
