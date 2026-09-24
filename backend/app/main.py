from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.user import User
from app.models.storage import StorageLocation
from app.models.booking import Booking
from app.models.checkin import CheckInCheckout

from app.routers import auth, storage


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="BagNest API",
    description="Smart Luggage Storage Network API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth.router)
app.include_router(storage.router)


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