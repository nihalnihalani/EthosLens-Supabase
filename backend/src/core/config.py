from pydantic_settings import BaseSettings
from typing import List, Optional
import os
from pathlib import Path

class Settings(BaseSettings):
    """Application settings"""
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    FAIL_FAST: bool = False
    
    # Security & JWT
    SECRET_KEY: str = "your-secret-key-change-this-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # AI & Data APIs
    GEMINI_API_KEY: Optional[str] = None
    QLOO_API_KEY: Optional[str] = None
    TAVILY_API_KEY: Optional[str] = None
    SCRAPER_API_KEY: Optional[str] = None
    
    # Google OAuth (Optional)
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None
    
    # Database
    POSTGRES_DATABASE_URL: str = "postgresql+asyncpg://ad_alchemy_user:ad_alchemy_password@localhost:5432/ad_alchemy_db"
    POSTGRES_SCHEMA: str = "public"
    POSTGRES_USE_SSL: bool = False
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # CORS & Security
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://127.0.0.1:3000"]
    TRUSTED_HOSTS: List[str] = ["localhost", "127.0.0.1"]
    
    # File Storage
    UPLOAD_DIR: str = "./uploads"
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50MB
    ALLOWED_FILE_TYPES: List[str] = ["image/jpeg", "image/png", "image/webp", "video/mp4"]
    
    # Rate Limiting
    RATE_LIMIT_REQUESTS: int = 100
    RATE_LIMIT_PERIOD: int = 3600  # 1 hour
    
    # External API Settings
    MAX_RETRIES: int = 3
    REQUEST_TIMEOUT: int = 30
    
    # Background Tasks
    CELERY_BROKER_URL: str = "redis://localhost:6379/1"
    CELERY_RESULT_BACKEND: str = "redis://localhost:6379/2"
    
    # Monitoring
    ENABLE_METRICS: bool = True
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create settings instance
settings = Settings()

# Ensure upload directory exists
if settings.UPLOAD_DIR:
    Path(settings.UPLOAD_DIR).mkdir(parents=True, exist_ok=True)