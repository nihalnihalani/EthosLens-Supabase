-- Initialize the AD Alchemy database
-- This script runs when the PostgreSQL container starts for the first time

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- The database schema will be created by Alembic migrations
-- This file is mainly for any initial setup that needs to happen
-- before the FastAPI application starts

-- You can add any initial data or configuration here

