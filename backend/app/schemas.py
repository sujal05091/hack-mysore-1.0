from pydantic import BaseModel, EmailStr
from uuid import UUID
from datetime import datetime
from typing import Optional
from app.models import UserRole

# -----------------
# USER SCHEMAS
# -----------------
class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    role: UserRole

class UserResponse(BaseModel):
    id: UUID
    email: EmailStr
    full_name: str
    role: UserRole
    created_at: datetime

    class Config:
        from_attributes = True

# -----------------
# PROFILE SCHEMAS
# -----------------
class CandidateProfileResponse(BaseModel):
    id: UUID
    headline: Optional[str]
    bio: Optional[str]
    experience_years: Optional[float]
    github_url: Optional[str]
    
    class Config:
        from_attributes = True
