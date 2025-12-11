# File: main.py
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List



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
@app.post("/projects/", response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = models.Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


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
