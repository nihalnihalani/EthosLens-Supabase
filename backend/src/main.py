from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
import uvicorn
import os
from contextlib import asynccontextmanager

from core.config import settings
from core.database import init_db
from api.routes import cultural, creative, auth, projects, analytics
from core.logging import setup_logging

# Setup logging
logger = setup_logging()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager"""
    # Startup
    logger.info("Starting AD Alchemy Backend...")
    await init_db()
    logger.info("Database initialized")
    
    yield
    
    # Shutdown
    logger.info("Shutting down AD Alchemy Backend...")

# Create FastAPI app
app = FastAPI(
    title="AD Alchemy API",
    description="AI-powered advertising creative platform combining cultural intelligence with video/image generation",
    version="1.0.0",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Trusted host middleware
if not settings.DEBUG:
    app.add_middleware(
        TrustedHostMiddleware,
        allowed_hosts=settings.TRUSTED_HOSTS
    )

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "AD Alchemy Backend",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT
    }

# Root endpoint
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to AD Alchemy API",
        "description": "AI-powered advertising creative platform",
        "docs": "/docs" if settings.DEBUG else "Documentation disabled in production",
        "version": "1.0.0"
    }

# Include routers
app.include_router(cultural.router, prefix="/api/cultural", tags=["Cultural Intelligence"])
app.include_router(creative.router, prefix="/api/creative", tags=["Creative Generation"])
app.include_router(projects.router, prefix="/api/projects", tags=["Project Management"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        log_level="debug" if settings.DEBUG else "info"
    )