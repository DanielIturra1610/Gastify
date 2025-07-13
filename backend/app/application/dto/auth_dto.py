from pydantic import BaseModel, EmailStr


class LoginRequest(BaseModel):
    """DTO para solicitud de inicio de sesión."""
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    """DTO para respuesta con token JWT."""
    access_token: str
    token_type: str = "bearer"