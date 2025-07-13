from typing import Generic, TypeVar, List, Optional, Dict, Any
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorCollection

T = TypeVar('T')

class BaseRepository(Generic[T]):
    """Repositorio base para operaciones CRUD con MongoDB."""
    
    def __init__(self, collection: AsyncIOMotorCollection):
        self.collection = collection
    
    async def find_all(self, query: Dict[str, Any] = None, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Encuentra todos los documentos que coinciden con la consulta."""
        query = query or {}
        cursor = self.collection.find(query).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)
    
    async def find_by_id(self, id: str) -> Optional[Dict[str, Any]]:
        """Encuentra un documento por su ID."""
        if not ObjectId.is_valid(id):
            return None
        return await self.collection.find_one({"_id": ObjectId(id)})
    
    async def create(self, document: Dict[str, Any]) -> Dict[str, Any]:
        """Crea un nuevo documento."""
        result = await self.collection.insert_one(document)
        return await self.find_by_id(str(result.inserted_id))
    
    async def update(self, id: str, document: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Actualiza un documento existente."""
        if not ObjectId.is_valid(id):
            return None
            
        # Excluimos _id si está presente para evitar errores de MongoDB
        if "_id" in document:
            del document["_id"]
            
        result = await self.collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": document}
        )
        
        if result.modified_count:
            return await self.find_by_id(id)
        return None
    
    async def delete(self, id: str) -> bool:
        """Elimina un documento por su ID."""
        if not ObjectId.is_valid(id):
            return False
            
        result = await self.collection.delete_one({"_id": ObjectId(id)})
        return result.deleted_count > 0
    
    async def count(self, query: Dict[str, Any] = None) -> int:
        """Cuenta documentos que coinciden con la consulta."""
        query = query or {}
        return await self.collection.count_documents(query)