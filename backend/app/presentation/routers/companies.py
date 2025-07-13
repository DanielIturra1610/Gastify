from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any, Optional

from app.domain.services.company_service import CompanyService
from app.infrastructure.database.mongodb import Database
from app.infrastructure.security.jwt import get_current_user
from app.infrastructure.external.sii_service import SIIService

router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_company(
    company_data: Dict[str, Any],
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Crea una nueva empresa.
    
    Solo administradores pueden crear empresas.
    """
    # Verificar permisos
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para crear empresas"
        )
    
    # Inicializar servicios
    company_repository = db.get_company_repository()
    company_service = CompanyService(company_repository)
    
    # Validar RUT
    if not await company_service.validate_rut(company_data["rut"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="RUT inválido"
        )
    
    # Verificar si ya existe una empresa con ese RUT
    existing_company = await company_service.get_by_rut(company_data["rut"])
    if existing_company:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ya existe una empresa con ese RUT"
        )
    
    # Crear empresa
    new_company = await company_service.create(company_data)
    
    if not new_company:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se pudo crear la empresa"
        )
    
    return new_company

@router.get("/", response_model=List[Dict[str, Any]])
async def get_companies(
    skip: int = 0,
    limit: int = 100,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Obtiene todas las empresas activas.
    
    Solo administradores pueden ver todas las empresas.
    """
    # Verificar permisos
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para ver todas las empresas"
        )
    
    # Inicializar servicios
    company_repository = db.get_company_repository()
    company_service = CompanyService(company_repository)
    
    # Obtener empresas activas
    return await company_service.get_active_companies(skip, limit)

@router.get("/my-company", response_model=Dict[str, Any])
async def get_my_company(
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Obtiene la empresa del usuario actual."""
    # Verificar que el usuario tiene una empresa asignada
    if "company_id" not in current_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No tiene una empresa asignada"
        )
    
    # Inicializar servicios
    company_repository = db.get_company_repository()
    company_service = CompanyService(company_repository)
    
    # Obtener empresa
    company = await company_service.get_by_id(current_user["company_id"])
    
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Empresa no encontrada"
        )
    
    return company

@router.get("/{company_id}", response_model=Dict[str, Any])
async def get_company(
    company_id: str,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Obtiene una empresa por su ID."""
    # Verificar permisos (solo administradores o usuarios de la misma empresa)
    if current_user["role"] != "admin" and ("company_id" not in current_user or current_user["company_id"] != company_id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para ver esta empresa"
        )
    
    # Inicializar servicios
    company_repository = db.get_company_repository()
    company_service = CompanyService(company_repository)
    
    # Obtener empresa
    company = await company_service.get_by_id(company_id)
    
    if not company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Empresa no encontrada"
        )
    
    return company

@router.put("/{company_id}", response_model=Dict[str, Any])
async def update_company(
    company_id: str,
    company_data: Dict[str, Any],
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Actualiza una empresa existente."""
    # Verificar permisos (solo administradores o managers de la misma empresa)
    is_admin = current_user["role"] == "admin"
    is_company_manager = current_user["role"] == "manager" and "company_id" in current_user and current_user["company_id"] == company_id
    
    if not (is_admin or is_company_manager):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para actualizar esta empresa"
        )
    
    # Inicializar servicios
    company_repository = db.get_company_repository()
    company_service = CompanyService(company_repository)
    
    # Si se intenta modificar el RUT, verificar que sea válido
    if "rut" in company_data:
        if not is_admin:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Solo administradores pueden cambiar el RUT de una empresa"
            )
        
        if not await company_service.validate_rut(company_data["rut"]):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="RUT inválido"
            )
    
    # Añadir fecha de actualización
    from datetime import datetime
    company_data["updatedAt"] = datetime.now()
    
    # Actualizar empresa
    updated_company = await company_service.update(company_id, company_data)
    
    if not updated_company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Empresa no encontrada o no se pudo actualizar"
        )
    
    return updated_company

@router.put("/{company_id}/settings", response_model=Dict[str, Any])
async def update_company_settings(
    company_id: str,
    settings: Dict[str, Any],
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Actualiza la configuración de una empresa."""
    # Verificar permisos (solo administradores o managers de la misma empresa)
    is_admin = current_user["role"] == "admin"
    is_company_manager = current_user["role"] == "manager" and "company_id" in current_user and current_user["company_id"] == company_id
    
    if not (is_admin or is_company_manager):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para actualizar la configuración de esta empresa"
        )
    
    # Inicializar servicios
    company_repository = db.get_company_repository()
    company_service = CompanyService(company_repository)
    
    # Actualizar configuración
    updated_company = await company_service.update_company_settings(company_id, settings)
    
    if not updated_company:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Empresa no encontrada o no se pudo actualizar la configuración"
        )
    
    return updated_company

@router.delete("/{company_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deactivate_company(
    company_id: str,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Desactiva una empresa (soft delete)."""
    # Solo administradores pueden desactivar empresas
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para desactivar empresas"
        )
    
    # Inicializar servicios
    company_repository = db.get_company_repository()
    company_service = CompanyService(company_repository)
    
    # Desactivar empresa
    success = await company_service.deactivate_company(company_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Empresa no encontrada o no se pudo desactivar"
        )

@router.post("/verify-sii", response_model=Dict[str, Any])
async def verify_company_in_sii(
    rut: str,
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Verifica si una empresa existe en el SII y obtiene su información."""
    # Inicializar servicios
    sii_service = SIIService()
    
    # Verificar empresa en SII
    return await sii_service.get_company_info(rut)