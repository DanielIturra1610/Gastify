from typing import Dict, Any
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase, AsyncIOMotorCollection
from app.domain.repositories.user_repository import UserRepository
from app.domain.repositories.company_repository import CompanyRepository
from app.domain.repositories.expense_repository import ExpenseRepository


class Database:
    """Clase para gestionar la conexión a MongoDB y acceder a las colecciones."""
    
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None
    
    def __init__(self, mongodb_url: str = "mongodb://mongo:27017", db_name: str = "gastify"):
        self.mongodb_url = mongodb_url
        self.db_name = db_name
        
    async def connect(self):
        """Conecta a MongoDB."""
        self.client = AsyncIOMotorClient(self.mongodb_url)
        self.db = self.client[self.db_name]
        print(f"Conectado a MongoDB: {self.mongodb_url}/{self.db_name}")
        
    async def close(self):
        """Cierra la conexión a MongoDB."""
        if self.client:
            self.client.close()
            print("Conexión a MongoDB cerrada")
            
    def get_collection(self, collection_name: str) -> AsyncIOMotorCollection:
        """Devuelve una colección de MongoDB."""
        return self.db[collection_name]
    
    def get_user_repository(self) -> UserRepository:
        """Devuelve un repositorio de usuarios."""
        return UserRepository(self.get_collection("users"))
        
    def get_company_repository(self) -> CompanyRepository:
        """Devuelve un repositorio de empresas."""
        return CompanyRepository(self.get_collection("companies"))
        
    def get_expense_repository(self) -> ExpenseRepository:
        """Devuelve un repositorio de gastos."""
        return ExpenseRepository(self.get_collection("expenses"))
        
    async def create_indexes(self):
        """Crea índices para optimizar las consultas."""
        # Índices para usuarios
        await self.db.users.create_index("email", unique=True)
        await self.db.users.create_index("companyId")
        
        # Índices para empresas
        await self.db.companies.create_index("rut", unique=True)
        
        # Índices para gastos
        await self.db.expenses.create_index("userId")
        await self.db.expenses.create_index("companyId")
        await self.db.expenses.create_index("status")
        await self.db.expenses.create_index("date")