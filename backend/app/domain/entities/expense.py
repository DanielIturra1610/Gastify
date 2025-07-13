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


class ReceiptData(BaseModel):
    filename: str
    url: str
    contentType: str
    size: Optional[int] = None
    ocrData: Optional[Dict[str, Any]] = None


class GeoLocation(BaseModel):
    lat: float
    lng: float
    address: Optional[str] = None


class ApprovalStep(BaseModel):
    userId: PyObjectId
    status: str = "pending"  # pending, approved, rejected
    date: Optional[datetime] = None
    comments: Optional[str] = None


class ExpenseBase(BaseModel):
    userId: PyObjectId
    companyId: PyObjectId
    amount: float
    currency: str = "CLP"
    description: str
    category: str
    date: datetime
    receipt: Optional[ReceiptData] = None
    location: Optional[GeoLocation] = None
    status: str = "pending"  # pending, approved, rejected
    approvalFlow: Optional[List[ApprovalStep]] = []
    documentType: str = "Boleta"  # Boleta, Factura, Recibo, Otro
    documentNumber: Optional[str] = None
    vendor: Optional[str] = None
    tags: List[str] = []
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: Optional[datetime] = None


class ExpenseCreate(ExpenseBase):
    pass


class ExpenseUpdate(BaseModel):
    amount: Optional[float] = None
    currency: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    date: Optional[datetime] = None
    receipt: Optional[ReceiptData] = None
    location: Optional[GeoLocation] = None
    status: Optional[str] = None
    approvalFlow: Optional[List[ApprovalStep]] = None
    documentType: Optional[str] = None
    documentNumber: Optional[str] = None
    vendor: Optional[str] = None
    tags: Optional[List[str]] = None
    updatedAt: datetime = Field(default_factory=datetime.now)


class Expense(ExpenseBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}