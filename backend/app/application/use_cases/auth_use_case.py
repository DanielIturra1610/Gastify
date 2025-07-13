from datetime import timedelta
from typing import Dict, Any, Optional

from app.domain.services.user_service import UserService
from app.application.dto.auth_dto import LoginRequest, TokenResponse
from app.infrastructure.security.jwt import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES


class AuthUseCase:
    """Caso de uso para autenticación de usuarios."""
    
    def __init__(self, user_service: UserService):
        self.user_service = user_service
    
    async def login(self, login_data: LoginRequest) -> Optional[TokenResponse]:
        """Autentica un usuario y genera un token JWT."""
        # Autenticar usuario
        user = await self.user_service.authenticate_user(login_data.email, login_data.password)
        
        if not user:
            return None
            
        # Generar token JWT
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        token_data = {
            "sub": str(user["_id"]),
            "email": user["email"],
            "role": user["role"]
        }
        
        if user.get("companyId"):
            token_data["company_id"] = str(user["companyId"])
        
        access_token = create_access_token(
            data=token_data,
            expires_delta=access_token_expires
        )
        
        return TokenResponse(access_token=access_token)