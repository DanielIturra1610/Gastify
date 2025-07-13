from typing import Dict, List, Any, Optional
from app.domain.repositories.company_repository import CompanyRepository
from app.domain.services.base_service import BaseService


class CompanyService(BaseService):
    """Servicio para operaciones de dominio relacionadas con empresas."""
    
    def __init__(self, repository: CompanyRepository):
        super().__init__(repository)
    
    async def get_by_rut(self, rut: str) -> Optional[Dict[str, Any]]:
        """Obtiene una empresa por su RUT."""
        return await self.repository.find_by_rut(rut)
    
    async def get_active_companies(self, skip: int = 0, limit: int = 100) -> List[Dict[str, Any]]:
        """Obtiene todas las empresas activas."""
        return await self.repository.find_active(skip, limit)
    
    async def update_company_settings(self, company_id: str, settings: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Actualiza la configuración de una empresa."""
        return await self.repository.update_settings(company_id, settings)
    
    async def validate_rut(self, rut: str) -> bool:
        """Valida el formato y dígito verificador de un RUT chileno."""
        # Eliminar puntos y guión del RUT
        rut = rut.replace(".", "").replace("-", "")
        
        # Verificar que el RUT tiene el formato correcto
        if not rut[:-1].isdigit():
            return False
            
        # Obtener dígito verificador
        dv = rut[-1].upper()
        
        # Calcular dígito verificador
        rut = rut[:-1]
        reversed_digits = map(int, reversed(rut))
        factors = [2, 3, 4, 5, 6, 7]
        s = 0
        for i, d in enumerate(reversed_digits):
            s += d * factors[i % len(factors)]
        
        expected_dv = 11 - (s % 11)
        
        if expected_dv == 11:
            expected_dv = "0"
        elif expected_dv == 10:
            expected_dv = "K"
        else:
            expected_dv = str(expected_dv)
            
        return dv == expected_dv
    
    async def verify_company_in_sii(self, rut: str) -> Dict[str, Any]:
        """Verificar si una empresa existe en el SII (simulado para MVP).
        
        En una versión real, esto haría una llamada a la API del SII.
        """
        # Simulación de respuesta para MVP
        if self.validate_rut(rut):
            return {
                "exists": True,
                "status": "Activo",
                "name": "Nombre simulado para MVP",
                "activity": "Actividad simulada para MVP"
            }
        else:
            return {
                "exists": False,
                "error": "RUT inválido o no encontrado en SII"
            }
    
    async def deactivate_company(self, company_id: str) -> bool:
        """Desactiva una empresa (soft delete)."""
        return await self.repository.deactivate(company_id)