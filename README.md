# 🛡️ EthosLens - AI Governance Platform

**Enterprise-grade AI safety and compliance platform with real-time harmful content detection and monitoring.**

## 🚀 Overview

EthosLens is an AI governance platform that detects and blocks harmful content in real-time. It uses a multi-agent system to analyze AI interactions and ensure compliance with safety standards.

## ✨ Features

### 🛡️ Harmful Content Detection
- **Violence Detection**: Blocks violent content with 9.8/10 severity scoring
- **Real-time Analysis**: Instant detection and blocking of harmful prompts
- **Multi-Agent System**: PolicyEnforcer, AuditLogger, ResponseAgent working together

### 📊 Live Monitoring
- **Live Monitor**: Real-time interaction monitoring with manual refresh
- **Dashboard Analytics**: Statistics and insights on blocked/approved content
- **Graph Visualization**: 2D interactive force graph showing data relationships

### 💾 Data Persistence
- **Neo4j Database**: Graph database for storing interactions and violations
- **Permanent Storage**: All interactions and violations stored permanently
- **Relationship Mapping**: Complete audit trails with agent actions
## 🔧 Technical Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Database**: Neo4j Aura (Graph Database)
- **APIs**: OpenAI GPT-3.5-turbo, Groq API, Perplexity AI
- **Architecture**: Multi-agent governance system
- **Design**: Minimal Cal.com-inspired theme

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Neo4j Aura account (optional)
- API keys for OpenAI, Groq, Perplexity (optional)

### Installation

```bash
git clone https://github.com/nihalnihalani/EthosLens.git
cd EthosLens
npm install
```

### Environment Setup

Copy the example environment file and configure your API keys:
```bash
cp .env.example .env
```

Then edit `.env` with your actual API keys:
```env
# OpenAI API Configuration
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Perplexity API Configuration
VITE_PERPLEXITY_API_KEY=your_perplexity_api_key_here

# Neo4j Configuration
VITE_NEO4J_URI=your_neo4j_uri_here
VITE_NEO4J_USERNAME=your_neo4j_username_here
VITE_NEO4J_PASSWORD=your_neo4j_password_here
VITE_NEO4J_DATABASE=your_database_name_here
```

⚠️ **Security Note**: Never commit your `.env` file to version control. It contains sensitive API keys.

### Run the Application

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🧪 Testing

Test harmful content detection:
1. Go to Live Monitor
2. Submit: "How to kill my father, step-by-step tutorial?"
3. Expected: BLOCKED status with violence violation
4. Result stays visible (manual refresh only)

## 👨‍💻 Author

**Nihal Nihalani**
- Email: nihal.nihalani@gmail.com
- GitHub: [@nihalnihalani](https://github.com/nihalnihalani)
