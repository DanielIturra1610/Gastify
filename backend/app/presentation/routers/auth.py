from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.application.dto.auth_dto import LoginRequest, TokenResponse
from app.application.use_cases.auth_use_case import AuthUseCase
from app.domain.services.user_service import UserService
from app.infrastructure.database.mongodb import Database

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/login", response_model=TokenResponse)
async def login(login_data: LoginRequest, db: Database = Depends(lambda: Database())):
    """Inicia sesión y obtiene un token JWT."""
    # Inicializar repositorios y servicios
    user_repository = db.get_user_repository()
    user_service = UserService(user_repository)
    auth_use_case = AuthUseCase(user_service)
    
    # Autenticar usuario
    token = await auth_use_case.login(login_data)
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return token