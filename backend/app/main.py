from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from motor.motor_asyncio import AsyncIOMotorClient

# Importar routers
from app.presentation.routers import auth, users, companies, expenses

# Crear la aplicación FastAPI
app = FastAPI(
    title="Gastify API",
    description="API para la aplicación de rendición de gastos Gastify",
    version="0.1.0"
)

# Configurar CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://0.0.0.0:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configurar MongoDB
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient("mongodb://mongo:27017")
    app.mongodb = app.mongodb_client.gastify
    print("Conexión a MongoDB establecida")

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()
    print("Conexión a MongoDB cerrada")

# Incluir routers
app.include_router(auth.router, tags=["Autenticación"], prefix="/api/auth")
app.include_router(users.router, tags=["Usuarios"], prefix="/api/users")
app.include_router(companies.router, tags=["Empresas"], prefix="/api/companies")
app.include_router(expenses.router, tags=["Gastos"], prefix="/api/expenses")

# Montar archivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

# Ruta de inicio
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Bienvenido a la API de Gastify"}