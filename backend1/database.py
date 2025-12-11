# File: database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# 1. Setup the Database URL (SQLite)
SQLALCHEMY_DATABASE_URL = "sqlite:///./portfolio.db"

# 2. Create the Engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},  # Needed only for SQLite
)

# 3. Create the Session Local (The tool we use to talk to the DB)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# 4. Create the Base Class (Modern SQLAlchemy 2.0 way)
class Base(DeclarativeBase):
    pass


# 5. Helper function to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
