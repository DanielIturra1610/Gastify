from typing import Dict, List, Any, Optional
from app.domain.repositories.user_repository import UserRepository
from app.domain.services.base_service import BaseService
from app.infrastructure.security.password import get_password_hash, verify_password


class UserService(BaseService):
    """Servicio para operaciones de dominio relacionadas con usuarios."""
    
    def __init__(self, repository: UserRepository):
        super().__init__(repository)
    
    async def get_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Obtiene un usuario por su email."""
        return await self.repository.find_by_email(email)
    
    async def get_by_company(self, company_id: str, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Obtiene usuarios por ID de empresa."""
        return await self.repository.find_by_company(company_id, skip, limit)
    
    async def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        """Crea un nuevo usuario con contraseña hasheada."""
        # Hash de la contraseña antes de almacenarla
        if "password" in user_data:
            hashed_password = get_password_hash(user_data["password"])
            user_data["hashed_password"] = hashed_password
            del user_data["password"]
        
        return await self.repository.create(user_data)
    
    async def authenticate_user(self, email: str, password: str) -> Optional[Dict[str, Any]]:
        """Autentica un usuario por email y contraseña."""
        user = await self.repository.find_by_email(email)
        
        if not user:
            return None
            
        if not verify_password(password, user["hashed_password"]):
            return None
            
        # Actualizar último login
        await self.repository.update_last_login(str(user["_id"]))
            
        return user
    
    async def change_password(self, user_id: str, current_password: str, new_password: str) -> bool:
        """Cambia la contraseña de un usuario verificando la contraseña actual."""
        user = await self.repository.find_by_id(user_id)
        
        if not user:
            return False
            
        if not verify_password(current_password, user["hashed_password"]):
            return False
            
        hashed_password = get_password_hash(new_password)
        return await self.repository.change_password(user_id, hashed_password)
    
    async def deactivate_user(self, user_id: str) -> bool:
        """Desactiva un usuario (soft delete)."""
        return await self.repository.deactivate(user_id)