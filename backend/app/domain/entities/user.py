from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field
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


class UserProfile(BaseModel):
    firstName: str
    lastName: str
    rut: str
    phone: Optional[str] = None


class UserBase(BaseModel):
    email: EmailStr
    profile: UserProfile
    companyId: Optional[PyObjectId] = None
    role: str = "employee"
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: Optional[datetime] = None
    isActive: bool = True


class UserCreate(UserBase):
    password: str


class UserInDB(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    hashed_password: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class User(UserBase):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}