from typing import Optional, List, Dict, Any
from motor.motor_asyncio import AsyncIOMotorCollection
from app.domain.repositories.base_repository import BaseRepository
from app.domain.entities.company import Company


class CompanyRepository(BaseRepository[Company]):
    """Repositorio para operaciones con empresas."""
    
    def __init__(self, collection: AsyncIOMotorCollection):
        super().__init__(collection)
    
    async def find_by_rut(self, rut: str) -> Optional[Dict[str, Any]]:
        """Encuentra una empresa por su RUT."""
        return await self.collection.find_one({"rut": rut})
    
    async def find_active(self, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Encuentra todas las empresas activas."""
        cursor = self.collection.find({"isActive": True}).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)
    
    async def update_settings(self, id: str, settings: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Actualiza la configuración de una empresa."""
        from datetime import datetime
        
        # Preparamos el documento de actualización con la fecha
        update_doc = {
            "settings": settings,
            "updatedAt": datetime.now()
        }
        
        return await self.update(id, update_doc)
    
    async def deactivate(self, id: str) -> bool:
        """Desactiva una empresa (soft delete)."""
        from datetime import datetime
        
        update_doc = {
            "isActive": False,
            "updatedAt": datetime.now()
        }
        
        result = await self.update(id, update_doc)
        return result is not None