from typing import Optional, List, Dict, Any
from datetime import datetime
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorCollection
from app.domain.repositories.base_repository import BaseRepository
from app.domain.entities.expense import Expense


class ExpenseRepository(BaseRepository[Expense]):
    """Repositorio para operaciones con gastos."""
    
    def __init__(self, collection: AsyncIOMotorCollection):
        super().__init__(collection)
    
    async def find_by_user(self, user_id: str, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Encuentra gastos por ID de usuario."""
        if not ObjectId.is_valid(user_id):
            return []
            
        cursor = self.collection.find({"userId": ObjectId(user_id)}).sort("date", -1).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)
    
    async def find_by_company(self, company_id: str, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Encuentra gastos por ID de empresa."""
        if not ObjectId.is_valid(company_id):
            return []
            
        cursor = self.collection.find({"companyId": ObjectId(company_id)}).sort("date", -1).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)
    
    async def find_by_status(self, status: str, company_id: str = None, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Encuentra gastos por estado y opcionalmente por empresa."""
        query = {"status": status}
        
        if company_id and ObjectId.is_valid(company_id):
            query["companyId"] = ObjectId(company_id)
            
        cursor = self.collection.find(query).sort("date", -1).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)
    
    async def find_by_date_range(self, start_date: datetime, end_date: datetime, 
                                company_id: str = None, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Encuentra gastos por rango de fechas y opcionalmente por empresa."""
        query = {"date": {"$gte": start_date, "$lte": end_date}}
        
        if company_id and ObjectId.is_valid(company_id):
            query["companyId"] = ObjectId(company_id)
            
        cursor = self.collection.find(query).sort("date", -1).skip(skip).limit(limit)
        return await cursor.to_list(length=limit)
    
    async def update_status(self, id: str, status: str, approver_id: str, comments: str = None) -> Optional[Dict[str, Any]]:
        """Actualiza el estado de un gasto y añade un paso de aprobación."""
        if not ObjectId.is_valid(id) or not ObjectId.is_valid(approver_id):
            return None
            
        # Crear el nuevo paso de aprobación
        approval_step = {
            "userId": ObjectId(approver_id),
            "status": status,
            "date": datetime.now(),
            "comments": comments
        }
        
        # Actualizar el documento
        result = await self.collection.update_one(
            {"_id": ObjectId(id)},
            {
                "$set": {
                    "status": status,
                    "updatedAt": datetime.now()
                },
                "$push": {
                    "approvalFlow": approval_step
                }
            }
        )
        
        if result.modified_count:
            return await self.find_by_id(id)
        return None
    
    async def get_stats_by_category(self, company_id: str, start_date: datetime = None, end_date: datetime = None) -> List[Dict[str, Any]]:
        """Obtiene estadísticas de gastos por categoría."""
        if not ObjectId.is_valid(company_id):
            return []
            
        # Construir el match de la agregación
        match = {"companyId": ObjectId(company_id)}
        
        if start_date or end_date:
            match["date"] = {}
            if start_date:
                match["date"]["$gte"] = start_date
            if end_date:
                match["date"]["$lte"] = end_date
        
        # Pipeline de agregación
        pipeline = [
            {"$match": match},
            {"$group": {
                "_id": "$category",
                "count": {"$sum": 1},
                "totalAmount": {"$sum": "$amount"}
            }},
            {"$sort": {"totalAmount": -1}}
        ]
        
        return await self.collection.aggregate(pipeline).to_list(None)