from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("ID de MongoDB inválido")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, _schema_generator, field_schema):
        field_schema.update(type="string")
        return field_schema


class CompanyAddress(BaseModel):
    street: str
    city: str
    region: str
    postalCode: Optional[str] = None
    country: str = "Chile"


class CompanySettings(BaseModel):
    currency: str = "CLP"
    approvalWorkflow: bool = True
    categories: List[str] = ["Alimentación", "Transporte", "Alojamiento", "Material Oficina", "Otros"]
    allowedExpenseTypes: List[str] = ["Boleta", "Factura", "Recibo", "Otro"]
    maxExpenseAmount: Optional[int] = None


class CompanyBase(BaseModel):
    name: str
    rut: str
    address: Optional[CompanyAddress] = None
    settings: CompanySettings = Field(default_factory=CompanySettings)
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: Optional[datetime] = None
    isActive: bool = True


class CompanyCreate(CompanyBase):
    pass


class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[CompanyAddress] = None
    settings: Optional[Dict[str, Any]] = None
    updatedAt: datetime = Field(default_factory=datetime.now)


class Company(CompanyBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}