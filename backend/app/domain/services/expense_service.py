from typing import Dict, List, Any, Optional
from datetime import datetime
from app.domain.repositories.expense_repository import ExpenseRepository
from app.domain.services.base_service import BaseService


class ExpenseService(BaseService):
    """Servicio para operaciones de dominio relacionadas con gastos."""
    
    def __init__(self, repository: ExpenseRepository):
        super().__init__(repository)
    
    async def get_by_user(self, user_id: str, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Obtiene gastos por ID de usuario."""
        return await self.repository.find_by_user(user_id, skip, limit)
    
    async def get_by_company(self, company_id: str, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Obtiene gastos por ID de empresa."""
        return await self.repository.find_by_company(company_id, skip, limit)
    
    async def get_by_status(self, status: str, company_id: str = None, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Obtiene gastos por estado y opcionalmente por empresa."""
        return await self.repository.find_by_status(status, company_id, skip, limit)
    
    async def get_by_date_range(self, start_date: datetime, end_date: datetime, 
                               company_id: str = None, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Obtiene gastos por rango de fechas y opcionalmente por empresa."""
        return await self.repository.find_by_date_range(start_date, end_date, company_id, skip, limit)
    
    async def approve_expense(self, expense_id: str, approver_id: str, comments: str = None) -> Optional[Dict[str, Any]]:
        """Aprueba un gasto."""
        return await self.repository.update_status(expense_id, "approved", approver_id, comments)
    
    async def reject_expense(self, expense_id: str, approver_id: str, comments: str = None) -> Optional[Dict[str, Any]]:
        """Rechaza un gasto."""
        return await self.repository.update_status(expense_id, "rejected", approver_id, comments)
    
    async def get_category_stats(self, company_id: str, start_date: datetime = None, end_date: datetime = None) -> List[Dict[str, Any]]:
        """Obtiene estadísticas de gastos por categoría."""
        return await self.repository.get_stats_by_category(company_id, start_date, end_date)
    
    async def validate_expense_data(self, expense_data: Dict[str, Any], company_settings: Dict[str, Any] = None) -> Dict[str, Any]:
        """Valida los datos de un gasto según la configuración de la empresa."""
        validation_results = {
            "is_valid": True,
            "errors": []
        }
        
        # Validar monto máximo si está configurado
        if company_settings and "maxExpenseAmount" in company_settings and company_settings["maxExpenseAmount"]:
            if expense_data["amount"] > company_settings["maxExpenseAmount"]:
                validation_results["is_valid"] = False
                validation_results["errors"].append(f"El monto excede el máximo permitido de {company_settings['maxExpenseAmount']}")
        
        # Validar categoría si hay categorías definidas
        if company_settings and "categories" in company_settings and company_settings["categories"]:
            if expense_data["category"] not in company_settings["categories"]:
                validation_results["is_valid"] = False
                validation_results["errors"].append("Categoría no permitida")
        
        # Validar tipo de documento si hay tipos definidos
        if company_settings and "allowedExpenseTypes" in company_settings and company_settings["allowedExpenseTypes"]:
            if expense_data["documentType"] not in company_settings["allowedExpenseTypes"]:
                validation_results["is_valid"] = False
                validation_results["errors"].append("Tipo de documento no permitido")
        
        # Validar fecha (no puede ser futura)
        if "date" in expense_data and expense_data["date"] > datetime.now():
            validation_results["is_valid"] = False
            validation_results["errors"].append("La fecha no puede ser futura")
        
        return validation_results
    
    async def categorize_expense_auto(self, description: str, vendor: str = None) -> str:
        """Categoriza automáticamente un gasto basado en su descripción y vendedor.
        
        Esta es una implementación básica que luego puede ser mejorada con ML/AI.
        """
        # Palabras clave para categorías comunes
        keywords = {
            "Alimentación": ["restaurant", "comida", "almuerzo", "cena", "desayuno", "café"],
            "Transporte": ["taxi", "uber", "didi", "cabify", "metro", "bus", "combustible", "estacionamiento", "peaje"],
            "Alojamiento": ["hotel", "hostal", "airbnb", "hospedaje", "alojamiento"],
            "Material Oficina": ["papelería", "impresión", "toner", "papel", "oficina", "librería"],
        }
        
        # Convertir texto a minúsculas para búsqueda insensible a mayúsculas
        desc_lower = description.lower() if description else ""
        vendor_lower = vendor.lower() if vendor else ""
        
        # Buscar coincidencias
        for category, terms in keywords.items():
            for term in terms:
                if term in desc_lower or (vendor_lower and term in vendor_lower):
                    return category
        
        # Categoría por defecto si no hay coincidencias
        return "Otros"