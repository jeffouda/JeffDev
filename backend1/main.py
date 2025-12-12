# File: main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import requests


import models, schemas
from database import engine, get_db

# 1. Create the database tables
# This looks at models.py and creates the 'projects' table if it doesn't exist
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# 2. CORS Setup (Allow your React Frontend to talk to this Backend)
origins = [
    "http://localhost:5173",  # Vite (React) default port
    "http://localhost:3000",  # Alternative React port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ROUTES ---


@app.get("/")
def read_root():
   return {"message": "Portfolio API is running!"}


# POST: Add a new project
# @app.post("/projects/", response_model=schemas.ProjectResponse)
# def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
#     db_project = models.Project(**project.dict())
#     db.add(db_project)
#     db.commit()
#     db.refresh(db_project)
#     return db_project

DISCORD_WEBHOOK_URL = "https://discordapp.com/api/webhooks/1449025094352502795/uTOmVLjjuwl1knjha8kS0ILkQnaHczzirmq5x9fQK6LGu64hcZovo_fJn1qyd5Ida4kv"


@app.post("/contact/", response_model=schemas.ContactResponse)
def create_contact(message: schemas.ContactCreate, db: Session = Depends(get_db)):
    # 1. Save to Database (Standard)
    db_message = models.ContactMessage(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)

    # 2. Send Notification to Discord (The Magic Part)
    try:
        notification_data = {
            "content": f"🚨 **New Portfolio Inquiry!**\n\n**From:** {message.name} ({message.email})\n**Message:** {message.message}"
        }
        requests.post(DISCORD_WEBHOOK_URL, json=notification_data)
    except Exception as e:
        print(f"Failed to send Discord notification: {e}")
        # We don't stop the request; we just log the error

    return db_message



# GET: Retrieve all projects
@app.get("/projects/", response_model=List[schemas.ProjectResponse])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = db.query(models.Project).offset(skip).limit(limit).all()
    return projects


# POST: Send a Contact Message
@app.post("/contact/", response_model=schemas.ContactResponse)
def create_contact(message: schemas.ContactCreate, db: Session = Depends(get_db)):
    # 1. Convert the Schema (Pydantic) to a Model (SQLAlchemy)
    db_message = models.ContactMessage(**message.dict())

    # 2. Add to database and commit
    db.add(db_message)
    db.commit()
    db.refresh(db_message)

    # 3. Return the saved message
    return db_message


# DELETE: Remove a project
@app.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    # 1. Find the project
    project = db.query(models.Project).filter(models.Project.id == project_id).first()

    # 2. If not found, raise error
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")

    # 3. Delete and save
    db.delete(project)
    db.commit()

    return {"message": "Project deleted successfully"}