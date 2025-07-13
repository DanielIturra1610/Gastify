from typing import Dict, Any, Optional, List
from datetime import datetime
from bson import ObjectId

from app.domain.services.expense_service import ExpenseService
from app.domain.services.company_service import CompanyService
from app.infrastructure.external.ocr_service import OCRService


class ExpenseUseCase:
    """Caso de uso para gestión de gastos."""
    
    def __init__(self, expense_service: ExpenseService, company_service: CompanyService, ocr_service: OCRService = None):
        self.expense_service = expense_service
        self.company_service = company_service
        self.ocr_service = ocr_service
    
    async def create_expense(self, expense_data: Dict[str, Any], user_id: str) -> Optional[Dict[str, Any]]:
        """Crea un nuevo gasto."""
        # Asegurarse de que el usuario está asignado como creador del gasto
        expense_data["userId"] = ObjectId(user_id)
        
        # Convertir IDs a ObjectId
        if "companyId" in expense_data and isinstance(expense_data["companyId"], str):
            expense_data["companyId"] = ObjectId(expense_data["companyId"])
        
        # Validar datos del gasto según la configuración de la empresa
        company_settings = None
        if "companyId" in expense_data:
            company = await self.company_service.get_by_id(str(expense_data["companyId"]))
            if company and "settings" in company:
                company_settings = company["settings"]
        
        validation = await self.expense_service.validate_expense_data(expense_data, company_settings)
        if not validation["is_valid"]:
            return {
                "success": False,
                "errors": validation["errors"]
            }
        
        # Categorizar automáticamente si no se proporciona una categoría
        if "category" not in expense_data or not expense_data["category"]:
            description = expense_data.get("description", "")
            vendor = expense_data.get("vendor", "")
            expense_data["category"] = await self.expense_service.categorize_expense_auto(description, vendor)
        
        # Crear gasto
        new_expense = await self.expense_service.create(expense_data)
        if new_expense:
            return {
                "success": True,
                "data": new_expense
            }
        else:
            return {
                "success": False,
                "errors": ["Error al crear gasto"]
            }
    
    async def get_expense(self, expense_id: str) -> Optional[Dict[str, Any]]:
        """Obtiene un gasto por su ID."""
        return await self.expense_service.get_by_id(expense_id)
    
    async def get_expenses_by_user(self, user_id: str, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Obtiene gastos por ID de usuario."""
        return await self.expense_service.get_by_user(user_id, skip, limit)
    
    async def get_expenses_by_company(self, company_id: str, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Obtiene gastos por ID de empresa."""
        return await self.expense_service.get_by_company(company_id, skip, limit)
    
    async def get_expenses_by_status(self, status: str, company_id: str = None, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Obtiene gastos por estado y opcionalmente por empresa."""
        return await self.expense_service.get_by_status(status, company_id, skip, limit)
    
    async def update_expense(self, expense_id: str, expense_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Actualiza un gasto existente."""
        # Convertir IDs a ObjectId
        if "userId" in expense_data and isinstance(expense_data["userId"], str):
            expense_data["userId"] = ObjectId(expense_data["userId"])
        if "companyId" in expense_data and isinstance(expense_data["companyId"], str):
            expense_data["companyId"] = ObjectId(expense_data["companyId"])
        
        # Añadir fecha de actualización
        expense_data["updatedAt"] = datetime.now()
        
        return await self.expense_service.update(expense_id, expense_data)
    
    async def delete_expense(self, expense_id: str) -> bool:
        """Elimina un gasto por su ID."""
        return await self.expense_service.delete(expense_id)
    
    async def approve_expense(self, expense_id: str, approver_id: str, comments: str = None) -> Optional[Dict[str, Any]]:
        """Aprueba un gasto."""
        return await self.expense_service.approve_expense(expense_id, approver_id, comments)
    
    async def reject_expense(self, expense_id: str, approver_id: str, comments: str = None) -> Optional[Dict[str, Any]]:
        """Rechaza un gasto."""
        return await self.expense_service.reject_expense(expense_id, approver_id, comments)
    
    async def get_category_stats(self, company_id: str, start_date: datetime = None, end_date: datetime = None) -> List[Dict[str, Any]]:
        """Obtiene estadísticas de gastos por categoría."""
        return await self.expense_service.get_category_stats(company_id, start_date, end_date)
    
    async def process_receipt_image(self, image_bytes: bytes) -> Dict[str, Any]:
        """Procesa una imagen de boleta/factura y extrae información."""
        if not self.ocr_service:
            return {
                "success": False,
                "error": "Servicio OCR no disponible"
            }
        
        try:
            ocr_result = await self.ocr_service.process_receipt(image_bytes)
            return ocr_result
        except Exception as e:
            return {
                "success": False,
                "error": f"Error al procesar imagen: {str(e)}"
            }