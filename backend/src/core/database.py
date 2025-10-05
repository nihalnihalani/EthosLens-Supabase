from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from core.config import settings
import logging
import asyncio

logger = logging.getLogger(__name__)

# Create sync engine for table creation
sync_engine = create_engine(
    settings.POSTGRES_DATABASE_URL.replace("postgresql+asyncpg://", "postgresql://"),
    echo=settings.DEBUG,
    pool_pre_ping=True
)

# Create async engine for runtime operations
async_engine = create_async_engine(
    settings.POSTGRES_DATABASE_URL,
    echo=settings.DEBUG,
    pool_pre_ping=True
)

# Create async session maker
AsyncSessionLocal = sessionmaker(
    async_engine, class_=AsyncSession, expire_on_commit=False
)

async def init_db():
    """Initialize database tables"""
    try:
        # Create all tables using sync engine
        SQLModel.metadata.create_all(sync_engine)
        logger.info("Database tables created successfully")
    except Exception as e:
        logger.error(f"Error creating database tables: {e}")
        # Don't raise - allow server to start without DB
        pass

def get_session():
    """Get database session (sync)"""
    with Session(sync_engine) as session:
        yield session

async def get_async_session():
    """Get async database session"""
    async with AsyncSessionLocal() as session:
        yield session