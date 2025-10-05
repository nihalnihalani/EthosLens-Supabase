#!/bin/bash

# EthosLens Supabase Setup Script
# This script helps you set up Supabase for the EthosLens platform

set -e

echo "🚀 EthosLens Supabase Setup"
echo "============================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js $(node --version) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} npm $(npm --version) detected"

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠${NC}  .env file not found. Creating from env.example..."
    if [ -f "env.example" ]; then
        cp env.example .env
        echo -e "${GREEN}✓${NC} Created .env file"
        echo ""
        echo -e "${YELLOW}⚠${NC}  Please edit .env and add your Supabase credentials:"
        echo "   - VITE_SUPABASE_URL"
        echo "   - VITE_SUPABASE_ANON_KEY"
        echo "   - SUPABASE_SERVICE_ROLE_KEY"
        echo ""
        read -p "Press Enter once you've updated .env..."
    else
        echo -e "${RED}❌ env.example file not found${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓${NC} .env file exists"
fi

# Source .env file
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Check if Supabase credentials are set
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
    echo -e "${YELLOW}⚠${NC}  Supabase credentials not found in .env"
    echo ""
    echo "Please add the following to your .env file:"
    echo "VITE_SUPABASE_URL=https://your-project.supabase.co"
    echo "VITE_SUPABASE_ANON_KEY=your-anon-key"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓${NC} Supabase credentials configured"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

echo -e "${GREEN}✓${NC} Dependencies installed"

# Check if Supabase CLI is installed
echo ""
echo "🔧 Checking Supabase CLI..."
if ! command -v supabase &> /dev/null; then
    echo -e "${YELLOW}⚠${NC}  Supabase CLI not found"
    read -p "Install Supabase CLI? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install -g supabase
        echo -e "${GREEN}✓${NC} Supabase CLI installed"
    else
        echo -e "${YELLOW}⚠${NC}  Skipping Supabase CLI installation"
    fi
else
    echo -e "${GREEN}✓${NC} Supabase CLI $(supabase --version) detected"
fi

# Offer to run local Supabase
echo ""
read -p "Start local Supabase? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Starting Supabase..."
    supabase start
    echo ""
    echo -e "${GREEN}✓${NC} Supabase started locally"
    echo ""
    echo "Update your .env with the local credentials shown above"
fi

# Offer to run migrations
echo ""
read -p "Run database migrations? (requires Supabase project) (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Running migrations..."
    echo "Please run the migration SQL manually:"
    echo "1. Go to your Supabase Dashboard > SQL Editor"
    echo "2. Copy contents of supabase/migrations/20240101000000_initial_schema.sql"
    echo "3. Paste and run the query"
    echo ""
    read -p "Press Enter once migrations are complete..."
fi

# Offer to seed data
echo ""
read -p "Seed database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Seeding database..."
    echo "Please run the seed SQL manually:"
    echo "1. Go to your Supabase Dashboard > SQL Editor"
    echo "2. Copy contents of supabase/seed.sql"
    echo "3. Paste and run the query"
    echo ""
    read -p "Press Enter once seeding is complete..."
fi

# Final instructions
echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Start the development server: npm run dev"
echo "2. Open http://localhost:5173"
echo "3. Check Supabase connection status in the dashboard"
echo ""
echo "For more information, see:"
echo "- README.md"
echo "- SUPABASE_SETUP.md"
echo ""
echo "Happy coding! 🚀"
