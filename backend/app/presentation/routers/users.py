from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Dict, Any

from app.application.dto.user_dto import UserCreateDTO, UserUpdateDTO, UserResponseDTO
from app.application.use_cases.user_use_case import UserUseCase
from app.domain.services.user_service import UserService
from app.infrastructure.database.mongodb import Database
from app.infrastructure.security.jwt import get_current_user

router = APIRouter()

@router.post("/", response_model=UserResponseDTO)
async def create_user(
    user_data: UserCreateDTO,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Crea un nuevo usuario.
    
    Solo administradores pueden crear usuarios.
    """
    # Verificar permisos
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para crear usuarios"
        )
    
    # Inicializar servicios
    user_repository = db.get_user_repository()
    user_service = UserService(user_repository)
    user_use_case = UserUseCase(user_service)
    
    # Crear usuario
    new_user = await user_use_case.create_user(user_data)
    
    if not new_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se pudo crear el usuario. El correo electrónico podría ya estar registrado."
        )
    
    return new_user

@router.get("/", response_model=List[UserResponseDTO])
async def get_users_by_company(
    skip: int = 0,
    limit: int = 100,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Obtiene usuarios de la empresa del usuario actual."""
    # Solo permitir a usuarios con companyId
    if "company_id" not in current_user:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para ver usuarios"
        )
    
    # Inicializar servicios
    user_repository = db.get_user_repository()
    user_service = UserService(user_repository)
    user_use_case = UserUseCase(user_service)
    
    # Obtener usuarios
    return await user_use_case.get_users_by_company(current_user["company_id"], skip, limit)

@router.get("/{user_id}", response_model=UserResponseDTO)
async def get_user(
    user_id: str,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Obtiene un usuario por su ID."""
    # Inicializar servicios
    user_repository = db.get_user_repository()
    user_service = UserService(user_repository)
    user_use_case = UserUseCase(user_service)
    
    # Verificar permisos (solo administradores o el propio usuario)
    if current_user["role"] != "admin" and current_user["sub"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para ver este usuario"
        )
    
    # Obtener usuario
    user = await user_use_case.get_user(user_id)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    
    return user

@router.put("/{user_id}", response_model=UserResponseDTO)
async def update_user(
    user_id: str,
    user_data: UserUpdateDTO,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Actualiza un usuario existente."""
    # Verificar permisos (solo administradores o el propio usuario)
    if current_user["role"] != "admin" and current_user["sub"] != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para actualizar este usuario"
        )
    
    # Los no administradores no pueden cambiar roles
    if current_user["role"] != "admin" and user_data.role is not None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para cambiar el rol de usuario"
        )
    
    # Inicializar servicios
    user_repository = db.get_user_repository()
    user_service = UserService(user_repository)
    user_use_case = UserUseCase(user_service)
    
    # Actualizar usuario
    updated_user = await user_use_case.update_user(user_id, user_data)
    
    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado o no se pudo actualizar"
        )
    
    return updated_user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def deactivate_user(
    user_id: str,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Desactiva un usuario (soft delete)."""
    # Solo administradores pueden desactivar usuarios
    if current_user["role"] != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tiene permisos para desactivar usuarios"
        )
    
    # Inicializar servicios
    user_repository = db.get_user_repository()
    user_service = UserService(user_repository)
    user_use_case = UserUseCase(user_service)
    
    # Desactivar usuario
    success = await user_use_case.deactivate_user(user_id)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado o no se pudo desactivar"
        )

@router.post("/change-password", status_code=status.HTTP_200_OK)
async def change_password(
    current_password: str,
    new_password: str,
    db: Database = Depends(lambda: Database()),
    current_user: Dict[str, Any] = Depends(get_current_user)
):
    """Cambia la contraseña del usuario actual."""
    # Inicializar servicios
    user_repository = db.get_user_repository()
    user_service = UserService(user_repository)
    user_use_case = UserUseCase(user_service)
    
    # Cambiar contraseña
    success = await user_use_case.change_password(current_user["sub"], current_password, new_password)
    
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No se pudo cambiar la contraseña. Verifique la contraseña actual."
        )
    
    return {"message": "Contraseña cambiada con éxito"}