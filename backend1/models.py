# File: models.py
from sqlalchemy import Column, Integer, String, Text,DateTime
from database import Base
from datetime import datetime

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    tech_stack = Column(String)  # e.g. "React, FastAPI"
    github_link = Column(String)
    live_link = Column(String, nullable=True)
    
    
class ContactMessage(Base):
    __tablename__ = "contact_message" 
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
         
