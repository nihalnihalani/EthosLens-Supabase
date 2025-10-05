# 🛡️ EthosLens - Enterprise AI Governance Platform

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Supabase](https://img.shields.io/badge/Supabase-Powered-green)](https://supabase.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

**EthosLens** is a comprehensive AI governance platform that provides real-time monitoring, compliance checking, and ethical oversight for AI systems. Built with Supabase for scalable data management and real-time capabilities.

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Supabase Integration](#-supabase-integration)
- [Agent System](#-agent-system)
- [API Documentation](#-api-documentation)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

EthosLens is an enterprise-grade AI governance platform that helps organizations maintain ethical AI practices through:

- **Real-time Monitoring**: Track all AI interactions in real-time with comprehensive audit trails
- **Policy Enforcement**: Define and enforce governance policies automatically
- **Compliance Checking**: Ensure AI responses comply with safety, privacy, and ethical standards
- **Violation Detection**: Automatically detect and flag policy violations
- **Multi-Agent System**: Specialized agents for different governance tasks
- **Analytics Dashboard**: Visual insights into AI performance and compliance metrics
- **Supabase Integration**: Scalable PostgreSQL database with real-time subscriptions

---

## ✨ Features

### 🔍 Real-time Monitoring
- **Live Dashboard**: Monitor AI interactions as they happen
- **Real-time Alerts**: Instant notifications for policy violations
- **Performance Metrics**: Track response times, safety scores, and compliance rates
- **Audit Trail**: Complete history of all AI interactions and governance actions

### 🛡️ Governance & Compliance
- **Policy Management**: Create, update, and enforce custom governance policies
- **Multi-Category Policies**: Support for safety, privacy, quality, fairness, and transparency policies
- **Automated Enforcement**: Automatic blocking or flagging of non-compliant responses
- **Compliance Reporting**: Generate detailed compliance reports

### 🤖 Intelligent Agent System
- **Response Agent**: Generates AI responses with built-in safety checks
- **Verifier Agent**: Validates responses against governance policies
- **Policy Enforcer**: Enforces policies and blocks violations
- **Audit Logger**: Maintains comprehensive audit logs
- **Feedback Agent**: Collects and analyzes user feedback for continuous improvement

### 📊 Analytics & Insights
- **Violation Tracking**: Monitor violations by category, severity, and time
- **Performance Analytics**: Analyze agent performance and system health
- **Safety Scoring**: Track safety scores across all interactions
- **Trend Analysis**: Identify patterns and trends in AI behavior

### 💾 Supabase-Powered Backend
- **PostgreSQL Database**: Robust, scalable data storage
- **Real-time Subscriptions**: Live updates for interactions, violations, and logs
- **Row Level Security**: Built-in security policies for data access
- **Auto-generated APIs**: RESTful and GraphQL APIs out of the box
- **Database Functions**: Custom SQL functions for complex queries

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Dashboard │  │ Monitors │  │ Violations│  │ Analytics│   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      │ Supabase Client SDK
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                    Supabase Backend                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  PostgreSQL Database                  │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │   │
│  │  │Interactions│ │Violations│ │Policies  │ │Agents    │ │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘ │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐              │   │
│  │  │AuditLogs │ │Feedback  │ │ Metrics  │              │   │
│  │  └──────────┘ └──────────┘ └──────────┘              │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Real-time Engine                     │   │
│  │  (WebSocket subscriptions for live updates)          │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                  Authentication                       │   │
│  │  (User management, JWT, Row Level Security)          │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────┘
                      │
                      │ External Integrations
                      │
┌─────────────────────▼───────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ OpenAI   │  │Perplexity│  │  Neo4j   │  │  Inkeep  │   │
│  │ (GPT-4)  │  │   API    │  │  Graph   │  │  Agents  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Chart.js** - Data visualization
- **Framer Motion** - Animations

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Authentication
  - Row Level Security
  - Auto-generated APIs
- **Supabase Client SDK** - Database interactions

### AI & Integrations
- **OpenAI GPT-4** - AI response generation
- **Perplexity API** - Enhanced search capabilities
- **Neo4j** (Optional) - Graph database for advanced analytics
- **Inkeep** - Agent orchestration

### DevOps & Tools
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **ESLint** - Code linting
- **Renovate** - Dependency management

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm/pnpm
- **Supabase Account** ([Sign up free](https://supabase.com))
- **OpenAI API Key** ([Get key](https://platform.openai.com))
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/nihalnihalani/EthosLens-Supabase.git
cd EthosLens-Supabase
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set Up Supabase

#### Option A: Use Supabase Cloud (Recommended)

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key from Settings > API
3. Run the database migrations:
   - Go to SQL Editor in Supabase Dashboard
   - Copy and run the contents of `supabase/migrations/20240101000000_initial_schema.sql`
   - Run the seed data: `supabase/seed.sql`

#### Option B: Run Supabase Locally

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase
supabase init

# Start Supabase locally
supabase start

# Run migrations
supabase db reset
```

### 4. Configure Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp env.example .env
```

Edit `.env` with your values:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-your-openai-key

# Optional: Perplexity API
VITE_PERPLEXITY_API_KEY=your-perplexity-key

# Optional: Neo4j (for advanced features)
NEO4J_URI=bolt://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=your-password
```

### 5. Run the Application

```bash
# Development mode
npm run dev

# Development with backend server
npm run dev:full

# Production build
npm run build
npm run preview
```

The application will be available at `http://localhost:5173`

---

## 💾 Supabase Integration

### Database Schema

EthosLens uses Supabase PostgreSQL with the following main tables:

#### **policies** - Governance Policies
- `id` (UUID) - Primary key
- `name` (VARCHAR) - Policy name
- `description` (TEXT) - Policy description
- `category` (VARCHAR) - safety, privacy, quality, fairness, transparency
- `rules` (JSONB) - Policy rules configuration
- `severity` (VARCHAR) - low, medium, high, critical
- `is_active` (BOOLEAN) - Active status

#### **interactions** - AI Interactions
- `id` (UUID) - Primary key
- `prompt` (TEXT) - User prompt
- `response` (TEXT) - AI response
- `agent_id` (UUID) - FK to agents table
- `safety_score` (DECIMAL) - Safety score (0-1)
- `compliance_status` (VARCHAR) - compliant, flagged, blocked
- `processing_time_ms` (INTEGER) - Processing time
- `metadata` (JSONB) - Additional metadata

#### **violations** - Policy Violations
- `id` (UUID) - Primary key
- `interaction_id` (UUID) - FK to interactions
- `policy_id` (UUID) - FK to policies
- `severity` (VARCHAR) - Violation severity
- `description` (TEXT) - Violation description
- `is_resolved` (BOOLEAN) - Resolution status

#### **audit_logs** - Comprehensive Audit Trail
- `id` (UUID) - Primary key
- `interaction_id` (UUID) - FK to interactions
- `agent_id` (UUID) - FK to agents
- `action` (VARCHAR) - Action performed
- `details` (JSONB) - Action details
- `level` (VARCHAR) - info, warning, error, critical

### Real-time Subscriptions

EthosLens leverages Supabase real-time capabilities:

```typescript
// Subscribe to new interactions
supabaseService.subscribeToInteractions((payload) => {
  console.log('New interaction:', payload);
  // Update UI in real-time
});

// Subscribe to violations
supabaseService.subscribeToViolations((payload) => {
  console.log('New violation:', payload);
  // Show alert
});
```

### Database Functions

Custom PostgreSQL functions for analytics:

```sql
-- Calculate compliance rate
SELECT calculate_compliance_rate(7); -- Last 7 days

-- Get agent performance
SELECT * FROM get_agent_performance('agent-id');
```

---

## 🤖 Agent System

### Available Agents

1. **Response Agent**
   - Generates AI responses using OpenAI GPT-4
   - Built-in safety checks and content filtering
   - Configurable temperature and token limits

2. **Verifier Agent**
   - Validates responses against all active policies
   - Calculates compliance scores
   - Identifies specific policy violations

3. **Policy Enforcer Agent**
   - Enforces policies automatically
   - Blocks or flags non-compliant content
   - Configurable enforcement thresholds

4. **Audit Logger Agent**
   - Maintains comprehensive audit trails
   - Logs all interactions and governance actions
   - Supports different log levels

5. **Feedback Agent**
   - Collects user feedback
   - Performs sentiment analysis
   - Helps improve AI responses over time

### Creating Custom Agents

```typescript
// Example: Custom agent implementation
export class CustomAgent implements Agent {
  async process(interaction: Interaction): Promise<AgentResult> {
    // Your custom logic
    return {
      passed: true,
      score: 0.95,
      details: { /* ... */ }
    };
  }
}
```

---

## 📚 API Documentation

### Supabase Service API

#### Interactions

```typescript
// Create interaction
await supabaseService.createInteraction({
  prompt: "User query",
  agent_id: "agent-uuid",
  safety_score: 0.95
});

// Get interactions
const interactions = await supabaseService.getInteractions(50, 0);

// Get interaction by ID
const interaction = await supabaseService.getInteractionById(id);
```

#### Violations

```typescript
// Create violation
await supabaseService.createViolation({
  interaction_id: "interaction-uuid",
  policy_id: "policy-uuid",
  severity: "high",
  description: "Content safety violation"
});

// Get violations
const violations = await supabaseService.getViolations({
  is_resolved: false,
  severity: "critical"
});

// Resolve violation
await supabaseService.resolveViolation(id, userId, "Resolution notes");
```

#### Analytics

```typescript
// Get statistics
const stats = await supabaseService.getStatistics(7); // Last 7 days
// Returns: { totalInteractions, complianceRate, avgSafetyScore, ... }

// Get violations by category
const violations = await supabaseService.getViolationsByCategory(7);
```

---

## ⚙️ Configuration

### Policy Configuration

Policies are defined in the `policies` table with JSONB rules:

```json
{
  "name": "Content Safety Policy",
  "category": "safety",
  "rules": {
    "prohibited_topics": ["violence", "hate_speech"],
    "max_response_length": 5000,
    "require_content_warning": true
  },
  "severity": "critical"
}
```

### Agent Configuration

Agents can be configured via the `agents` table:

```json
{
  "name": "Response Agent",
  "type": "response",
  "config": {
    "model": "gpt-4",
    "temperature": 0.7,
    "max_tokens": 2000,
    "system_prompt": "You are a helpful AI assistant..."
  }
}
```

---

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nihalnihalani/EthosLens-Supabase)

1. Click the button above
2. Add environment variables in Vercel dashboard
3. Deploy!

### Deploy to Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Docker Deployment

```bash
# Build image
docker build -t ethoslens .

# Run container
docker run -p 3000:3000 --env-file .env ethoslens
```

---

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

---

## 📖 Documentation

- [Integration Setup Guide](./INTEGRATION_SETUP.md)
- [Project Documentation](./PROJECT.md)
- [API Reference](./docs/api.md)
- [Agent Directory Setup](./my-agent-directory/README.md)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend infrastructure
- [OpenAI](https://openai.com) - AI capabilities
- [Vercel](https://vercel.com) - Hosting
- All our [contributors](https://github.com/nihalnihalani/EthosLens-Supabase/graphs/contributors)

---

## 📬 Contact

- **Author**: Nihal Nihalani
- **GitHub**: [@nihalnihalani](https://github.com/nihalnihalani)
- **Project**: [EthosLens-Supabase](https://github.com/nihalnihalani/EthosLens-Supabase)

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [Nihal Nihalani](https://github.com/nihalnihalani)

</div>