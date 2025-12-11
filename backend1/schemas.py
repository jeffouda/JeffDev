# File: schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# 1. The "Base" Schema (Shared properties)
class ProjectBase(BaseModel):
    title: str
    description: str
    tech_stack: str
    github_link: str
    live_link: Optional[str] = None


# 2. Create Schema (What you send TO the API)
# It looks exactly like the base, so we just inherit it
class ProjectCreate(ProjectBase):
    pass


# 3. Response Schema (What the API sends back TO YOU)
class ProjectResponse(ProjectBase):
    id: int

    # This config tells Pydantic to work with SQLAlchemy models
    class Config:
        from_attributes = True


# 1. Schema for SENDING a message (Frontend -> API)
class ContactCreate(BaseModel):
    name: str
    email: str
    message: str


# 2. Schema for RETURNING a message (API -> Frontend/Admin)
class ContactResponse(ContactCreate):
    id: int
    created_at: datetime  # Make sure to import datetime at the top!

    class Config:
        from_attributes = True