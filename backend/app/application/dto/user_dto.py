from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserProfileDTO(BaseModel):
    """DTO para perfil de usuario."""
    firstName: str
    lastName: str
    rut: str
    phone: Optional[str] = None


class UserCreateDTO(BaseModel):
    """DTO para creación de usuario."""
    email: EmailStr
    password: str
    profile: UserProfileDTO
    companyId: Optional[str] = None
    role: str = "employee"


class UserUpdateDTO(BaseModel):
    """DTO para actualización de usuario."""
    profile: Optional[UserProfileDTO] = None
    role: Optional[str] = None


class UserResponseDTO(BaseModel):
    """DTO para respuesta con datos de usuario."""
    id: str
    email: EmailStr
    profile: UserProfileDTO
    companyId: Optional[str] = None
    role: str
    createdAt: datetime
    updatedAt: Optional[datetime] = None
    isActive: bool