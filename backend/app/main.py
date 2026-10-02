from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.user import User
from app.models.storage import StorageLocation
from app.models.booking import Booking
from app.models.checkin import CheckInCheckout
from app.models.csv_import import CSVImport

from app.routers import (
    auth,
    storage,
    booking,
    checkin,
    csv_import,
    reports,
)

# Database Startup Fix (Fail ஆகாம இருக்க try-except)
try:
    Base.metadata.create_all(bind=engine)
    print("Database connection successful & tables created!")
except Exception as e:
    print(f"Database connection error: {e}")

app = FastAPI(
    title="BagNest API",
    description="Smart Luggage Storage Network API",
    version="1.0.0",
)

# Vercel & Cloud Frontend-க்கு அனுமதி அளிக்கும் வகையில் CORS Updated
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # அனைத்து Frontend Domain-களுக்கும் அனுமதி அளிக்கும்
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(storage.router)
app.include_router(booking.router)
app.include_router(checkin.router)
app.include_router(csv_import.router)
app.include_router(reports.router)


@app.get("/")
def root():
    return {
        "message": "BagNest API is running",
        "status": "success",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "BagNest Backend",
    }