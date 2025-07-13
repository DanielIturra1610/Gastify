from typing import Dict, Any, Optional, List
from bson import ObjectId

from app.domain.services.user_service import UserService
from app.application.dto.user_dto import UserCreateDTO, UserUpdateDTO, UserResponseDTO


class UserUseCase:
    """Caso de uso para gestión de usuarios."""
    
    def __init__(self, user_service: UserService):
        self.user_service = user_service
    
    async def create_user(self, user_data: UserCreateDTO) -> Optional[Dict[str, Any]]:
        """Crea un nuevo usuario."""
        # Convertir DTO a diccionario para el servicio de dominio
        user_dict = user_data.dict()
        
        # Verificar si el usuario ya existe
        existing_user = await self.user_service.get_by_email(user_data.email)
        if existing_user:
            return None
            
        # Convertir companyId a ObjectId si existe
        if user_dict.get("companyId"):
            if ObjectId.is_valid(user_dict["companyId"]):
                user_dict["companyId"] = ObjectId(user_dict["companyId"])
            else:
                return None  # ID de empresa inválido
        
        # Crear usuario
        return await self.user_service.create_user(user_dict)
    
    async def get_user(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Obtiene un usuario por su ID."""
        return await self.user_service.get_by_id(user_id)
    
    async def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Obtiene un usuario por su email."""
        return await self.user_service.get_by_email(email)
    
    async def get_users_by_company(self, company_id: str, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Obtiene usuarios por ID de empresa."""
        return await self.user_service.get_by_company(company_id, skip, limit)
    
    async def update_user(self, user_id: str, user_data: UserUpdateDTO) -> Optional[Dict[str, Any]]:
        """Actualiza un usuario existente."""
        # Convertir DTO a diccionario para el servicio de dominio
        update_dict = user_data.dict(exclude_unset=True)
        
        # Añadir fecha de actualización
        from datetime import datetime
        update_dict["updatedAt"] = datetime.now()
        
        return await self.user_service.update(user_id, update_dict)
    
    async def deactivate_user(self, user_id: str) -> bool:
        """Desactiva un usuario (soft delete)."""
        return await self.user_service.deactivate_user(user_id)
    
    async def change_password(self, user_id: str, current_password: str, new_password: str) -> bool:
        """Cambia la contraseña de un usuario."""
        return await self.user_service.change_password(user_id, current_password, new_password)