from typing import Generic, TypeVar, Dict, List, Any, Optional
from app.domain.repositories.base_repository import BaseRepository

T = TypeVar('T')
R = TypeVar('R', bound=BaseRepository)

class BaseService(Generic[T, R]):
    """Servicio base para operaciones de dominio."""
    
    def __init__(self, repository: R):
        self.repository = repository
    
    async def get_all(self, query: Dict[str, Any] = None, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Obtiene todos los elementos que coinciden con la consulta."""
        return await self.repository.find_all(query, skip, limit)
    
    async def get_by_id(self, id: str) -> Optional[Dict[str, Any]]:
        """Obtiene un elemento por su ID."""
        return await self.repository.find_by_id(id)
    
    async def create(self, item: Dict[str, Any]) -> Dict[str, Any]:
        """Crea un nuevo elemento."""
        return await self.repository.create(item)
    
    async def update(self, id: str, item: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Actualiza un elemento existente."""
        return await self.repository.update(id, item)
    
    async def delete(self, id: str) -> bool:
        """Elimina un elemento por su ID."""
        return await self.repository.delete(id)
    
    async def count(self, query: Dict[str, Any] = None) -> int:
        """Cuenta elementos que coinciden con la consulta."""
        return await self.repository.count(query)