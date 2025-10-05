# 🚀 Supabase Setup Guide for EthosLens

This comprehensive guide will walk you through setting up Supabase for the EthosLens AI Governance Platform.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Option 1: Supabase Cloud (Recommended)](#option-1-supabase-cloud-recommended)
- [Option 2: Local Supabase Development](#option-2-local-supabase-development)
- [Database Schema Setup](#database-schema-setup)
- [Seeding Sample Data](#seeding-sample-data)
- [Testing the Connection](#testing-the-connection)
- [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have:

- ✅ Node.js 18+ installed
- ✅ Git installed
- ✅ A Supabase account (sign up at [supabase.com](https://supabase.com))
- ✅ Basic knowledge of SQL and PostgreSQL

---

## Option 1: Supabase Cloud (Recommended)

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in the project details:
   - **Name**: `ethoslens-production` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
   - **Pricing Plan**: Start with the Free tier
4. Click **"Create new project"**
5. Wait 2-3 minutes for your project to be provisioned

### Step 2: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings > API**
2. Copy the following credentials:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string)
   - **service_role key**: `eyJhbGc...` (longer string, keep this secret!)

### Step 3: Configure Environment Variables

1. In your EthosLens project root, create a `.env` file:

```bash
cp env.example .env
```

2. Update the `.env` file with your Supabase credentials:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Other required configuration...
```

### Step 4: Run Database Migrations

#### Method A: Using Supabase Dashboard (Easiest)

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `supabase/migrations/20240101000000_initial_schema.sql`
4. Paste it into the SQL Editor
5. Click **"Run"** or press `Ctrl+Enter`
6. Wait for the migration to complete (you should see "Success")

#### Method B: Using Supabase CLI

```bash
# Install Supabase CLI globally
npm install -g supabase

# Link to your cloud project
supabase link --project-ref your-project-id

# Run migrations
supabase db push
```

### Step 5: Seed Sample Data (Optional)

To populate your database with sample data for testing:

1. In Supabase SQL Editor, create a new query
2. Copy the contents of `supabase/seed.sql`
3. Paste and run the query
4. This will create sample policies, agents, interactions, and violations

---

## Option 2: Local Supabase Development

### Step 1: Install Supabase CLI

```bash
# Using npm
npm install -g supabase

# Using Homebrew (macOS)
brew install supabase/tap/supabase

# Verify installation
supabase --version
```

### Step 2: Initialize Supabase

```bash
# Navigate to your project directory
cd EthosLens-Supabase

# Initialize Supabase (if not already done)
supabase init

# Start Supabase services (PostgreSQL, GoTrue, PostgREST, etc.)
supabase start
```

This will output connection details:

```
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
        anon key: eyJhbGc...
service_role key: eyJhbGc...
```

### Step 3: Configure Local Environment

Update your `.env` file:

```bash
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=<anon-key-from-output>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-from-output>
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
```

### Step 4: Run Migrations Locally

```bash
# Reset database and run all migrations
supabase db reset

# Or run migrations without reset
supabase db push
```

### Step 5: Access Local Supabase Studio

Open [http://localhost:54323](http://localhost:54323) to access Supabase Studio locally.

---

## Database Schema Setup

### Tables Created

The migration will create the following tables:

1. **policies** - Governance policies
   - Stores all compliance and governance rules
   - Categories: safety, privacy, quality, fairness, transparency

2. **agents** - AI agents
   - Response, Verifier, Enforcer, Logger, Feedback agents
   - Configuration and performance metrics

3. **interactions** - AI interactions
   - All prompts and responses
   - Safety scores and compliance status

4. **violations** - Policy violations
   - Detected violations with severity levels
   - Resolution tracking

5. **audit_logs** - Audit trail
   - Complete history of all actions
   - Multiple log levels (info, warning, error, critical)

6. **feedback** - User feedback
   - Ratings and comments
   - Feedback types and helpfulness

7. **policy_checks** - Policy check results
   - Individual policy check outcomes
   - Pass/fail status and scores

8. **agent_metrics** - Agent performance
   - Response times, accuracy, throughput
   - Time-series metrics

### Database Functions

The migration also creates helpful PostgreSQL functions:

```sql
-- Calculate compliance rate for last N days
SELECT calculate_compliance_rate(7);

-- Get performance summary for an agent
SELECT * FROM get_agent_performance('agent-uuid');
```

### Indexes

Optimized indexes are created for:
- Fast lookups by ID, status, category
- Time-range queries
- Full-text search on prompts
- JSON field queries

---

## Seeding Sample Data

### Automatic Seeding

Run the seed script to populate your database:

```bash
# In Supabase SQL Editor
-- Copy and paste contents of supabase/seed.sql
```

This creates:
- 5 governance policies
- 5 AI agents
- 50 sample interactions
- 20 violations
- 100 audit log entries
- 30 feedback entries

### Manual Data Entry

You can also add data through Supabase Studio:

1. Go to **Table Editor**
2. Select the table (e.g., `policies`)
3. Click **"Insert row"**
4. Fill in the required fields
5. Click **"Save"**

---

## Testing the Connection

### 1. Test from Command Line

```bash
# Start the development server
npm run dev

# The app should start and connect to Supabase
```

### 2. Check Connection Status

In the EthosLens dashboard:
- Look for the **Supabase Status** indicator in the sidebar
- It should show **"Connected"** with a green checkmark

### 3. Test Database Queries

```bash
# Using Supabase CLI
supabase db dump

# Or test a simple query
supabase db query "SELECT COUNT(*) FROM policies;"
```

### 4. Verify Real-time Subscriptions

In the app:
1. Open the **Live Monitor** page
2. Create a test interaction
3. You should see it appear in real-time without refreshing

---

## Environment Variables Reference

Here's the complete list of Supabase-related environment variables:

```bash
# Required
VITE_SUPABASE_URL=           # Your Supabase project URL
VITE_SUPABASE_ANON_KEY=      # Public anon key (safe to expose)

# Server-side only (keep secret)
SUPABASE_SERVICE_ROLE_KEY=   # Full access key (never expose to client)

# Database connection (for migrations/CLI)
DATABASE_URL=                # PostgreSQL connection string
```

---

## Troubleshooting

### Issue: "Invalid API Key"

**Solution:**
- Double-check your `VITE_SUPABASE_ANON_KEY` in `.env`
- Make sure there are no extra spaces or quotes
- Restart your development server after changing `.env`

### Issue: "Could not connect to Supabase"

**Solution:**
1. Verify your `VITE_SUPABASE_URL` is correct
2. Check if your Supabase project is active (not paused)
3. Check your internet connection
4. For local dev: ensure `supabase start` is running

### Issue: "Table does not exist"

**Solution:**
- Run the migration script again
- Check Supabase logs: Settings > API > Logs
- Verify the migration completed successfully

### Issue: "Permission denied for table"

**Solution:**
- Check Row Level Security (RLS) policies
- For development, you can temporarily disable RLS:
  ```sql
  ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
  ```
- Better: Create proper RLS policies for your use case

### Issue: Local Supabase won't start

**Solution:**
```bash
# Stop all services
supabase stop

# Reset and restart
supabase db reset
supabase start

# Check Docker containers
docker ps
```

### Issue: "Migration failed"

**Solution:**
1. Check for syntax errors in the SQL
2. Run migrations one section at a time
3. Check Supabase logs for detailed error messages
4. Ensure you have proper PostgreSQL permissions

---

## Advanced Configuration

### Enable Real-time for All Tables

```sql
-- Enable real-time for a specific table
ALTER PUBLICATION supabase_realtime ADD TABLE interactions;
ALTER PUBLICATION supabase_realtime ADD TABLE violations;
ALTER PUBLICATION supabase_realtime ADD TABLE audit_logs;
```

### Custom RLS Policies

```sql
-- Example: Users can only see their own interactions
CREATE POLICY "Users can view own interactions"
ON interactions FOR SELECT
USING (auth.uid() = user_id);

-- Example: Admin role can see everything
CREATE POLICY "Admins can view all"
ON interactions FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');
```

### Database Backups

```bash
# Backup your database
supabase db dump > backup.sql

# Restore from backup
supabase db reset
psql $DATABASE_URL < backup.sql
```

---

## Next Steps

After completing the Supabase setup:

1. ✅ Configure OpenAI API key in `.env`
2. ✅ Review and customize policies in the database
3. ✅ Configure agent settings
4. ✅ Set up monitoring and alerts
5. ✅ Deploy to production

For more information, see:
- [Main README](./README.md)
- [Integration Setup Guide](./INTEGRATION_SETUP.md)
- [API Documentation](./docs/api.md)

---

## Need Help?

- 📚 [Supabase Documentation](https://supabase.com/docs)
- 💬 [Supabase Discord](https://discord.supabase.com)
- 🐛 [Report Issues](https://github.com/nihalnihalani/EthosLens-Supabase/issues)
- 📧 Contact: nihal@example.com

---

**Happy Building! 🚀**
