import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Railway-இல் DATABASE_URL இருந்தால் அதை எடுக்கும், 
# இல்லையென்றால் Localhost-ஐ பயன்படுத்தும்
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:password@localhost:3306/bagnest" # Local default
)

# Railway தரும் 'postgres://' அல்லது 'mysql://' URL-களை SQLAlchemy-க்கு ஏற்ப சரிசெய்ய
if DATABASE_URL and DATABASE_URL.startswith("mysql://"):
    DATABASE_URL = DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)

engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True  # Connection drops-ஐ தவிர்க்க உதவும்
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()