from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any, Optional

from app.domain.services.expense_service import ExpenseService
from app.domain.repositories.expense_repository import ExpenseRepository
from app.domain.entities.expense import ExpenseCreate, ExpenseUpdate, Expense
from app.infrastructure.database.mongodb import Database
from app.infrastructure.security.jwt import get_current_user

router = APIRouter()

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_expense(
    expense_data: ExpenseCreate,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Crea un nuevo gasto asociado al usuario actual."""
    repository = ExpenseRepository(db)
    service = ExpenseService(repository)
    
    # Asegurar que el gasto está asociado al usuario actual
    expense_data_dict = expense_data.dict()
    expense_data_dict["userId"] = current_user["_id"]
    
    result = await service.create(expense_data_dict)
    return result

@router.get("/", response_model=List[Dict[str, Any]])
async def get_expenses(
    skip: int = 0,
    limit: int = 100,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Obtiene los gastos del usuario actual."""
    repository = ExpenseRepository(db)
    service = ExpenseService(repository)
    
    user_id = current_user["_id"]
    expenses = await service.get_by_user(user_id, skip, limit)
    return expenses

@router.get("/{expense_id}", response_model=Dict[str, Any])
async def get_expense(
    expense_id: str,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Obtiene un gasto específico por ID."""
    repository = ExpenseRepository(db)
    service = ExpenseService(repository)
    
    expense = await service.get_by_id(expense_id)
    
    if not expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gasto no encontrado"
        )
    
    # Verificar que el gasto pertenece al usuario actual o que es administrador
    if str(expense["userId"]) != str(current_user["_id"]) and current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permiso para acceder a este gasto"
        )
    
    return expense

@router.put("/{expense_id}", response_model=Dict[str, Any])
async def update_expense(
    expense_id: str,
    expense_update: ExpenseUpdate,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Actualiza un gasto existente."""
    repository = ExpenseRepository(db)
    service = ExpenseService(repository)
    
    # Verificar que el gasto existe
    existing_expense = await service.get_by_id(expense_id)
    
    if not existing_expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gasto no encontrado"
        )
    
    # Verificar que el usuario tiene permisos para actualizar este gasto
    if str(existing_expense["userId"]) != str(current_user["_id"]) and current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permiso para modificar este gasto"
        )
    
    update_data = {k: v for k, v in expense_update.dict().items() if v is not None}
    result = await service.update(expense_id, update_data)
    return result

@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(
    expense_id: str,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Elimina un gasto."""
    repository = ExpenseRepository(db)
    service = ExpenseService(repository)
    
    # Verificar que el gasto existe
    existing_expense = await service.get_by_id(expense_id)
    
    if not existing_expense:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Gasto no encontrado"
        )
    
    # Verificar que el usuario tiene permisos para eliminar este gasto
    if str(existing_expense["userId"]) != str(current_user["_id"]) and current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permiso para eliminar este gasto"
        )
    
    await service.delete(expense_id)
    return None

@router.get("/company/{company_id}", response_model=List[Dict[str, Any]])
async def get_company_expenses(
    company_id: str,
    skip: int = 0,
    limit: int = 100,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Obtiene los gastos de una empresa específica."""
    repository = ExpenseRepository(db)
    service = ExpenseService(repository)
    
    # Solo administradores o miembros de la empresa pueden ver estos gastos
    # (Esta validación debería ser más compleja en un caso real)
    
    expenses = await service.get_by_company(company_id, skip, limit)
    return expenses
