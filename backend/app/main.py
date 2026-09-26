from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import arena, users

app = FastAPI(
    title="VerifiCode API",
    description="Backend API for VerifiCode Platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(arena.router)
app.include_router(users.router)

@app.get("/api/v1/health")
def health_check():
    return {"status": "ok", "service": "verificode-backend"}
