from typing import Optional, List, Dict, Any
from motor.motor_asyncio import AsyncIOMotorCollection
from bson import ObjectId
from app.domain.repositories.base_repository import BaseRepository
from app.domain.entities.user import User, UserInDB


class UserRepository(BaseRepository[UserInDB]):
    """Repositorio para operaciones con usuarios."""
    
    def __init__(self, collection: AsyncIOMotorCollection):
        super().__init__(collection)
    
    async def find_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        """Encuentra un usuario por su email."""
        return await self.collection.find_one({"email": email})
    
    async def find_by_company(self, company_id: str, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Encuentra usuarios por ID de empresa."""
        if not ObjectId.is_valid(company_id):
            return []
            
        cursor = self.collection.find({"companyId": ObjectId(company_id)}).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)
    
    async def update_last_login(self, id: str) -> bool:
        """Actualiza la fecha del último inicio de sesión."""
        from datetime import datetime
        
        if not ObjectId.is_valid(id):
            return False
            
        result = await self.collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"lastLoginAt": datetime.now()}}
        )
        
        return result.modified_count > 0
    
    async def change_password(self, id: str, hashed_password: str) -> bool:
        """Cambia la contraseña de un usuario."""
        if not ObjectId.is_valid(id):
            return False
            
        result = await self.collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"hashed_password": hashed_password}}
        )
        
        return result.modified_count > 0
    
    async def deactivate(self, id: str) -> bool:
        """Desactiva un usuario (soft delete)."""
        if not ObjectId.is_valid(id):
            return False
            
        result = await self.collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"isActive": False}}
        )
        
        return result.modified_count > 0