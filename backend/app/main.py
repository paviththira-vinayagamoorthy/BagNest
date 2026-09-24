from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="BagSafe API",
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


@app.get("/")
def root():
    return {
        "message": "BagSafe API is running",
        "status": "success",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "BagSafe Backend",
    }