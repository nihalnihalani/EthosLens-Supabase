# AD Alchemy - AI-Powered Creative Intelligence Platform

![AD Alchemy](https://img.shields.io/badge/AD%20Alchemy-AI%20Creative%20Intelligence-blue?style=for-the-badge&logo=sparkles)

A cutting-edge AI platform that combines cultural intelligence with creative generation to produce culturally-aware advertisements and marketing content.

## 🚀 Features

### 🧠 Cultural Intelligence
- **Real-time Cultural Analysis**: Powered by Qloo Taste AI
- **Audience Insights**: Deep understanding of target demographics
- **Trending Topics**: Real-time cultural trend analysis
- **Cultural Alignment Scoring**: Quantified cultural relevance metrics

### 🎬 AI Video Generation
- **Veo 3 Integration**: Google's latest video generation model
- **Cultural Enhancement**: Videos enhanced with cultural intelligence
- **Platform Optimization**: Instagram, TikTok, YouTube ready
- **Performance Prediction**: AI-powered engagement forecasting

### 🖼️ AI Image Generation
- **Imagen 3 Integration**: Google's advanced image generation
- **Multi-Platform Support**: Instagram, Facebook, LinkedIn optimized
- **Cultural Context**: Images tailored to cultural preferences
- **Brand Consistency**: Cross-platform visual coherence

### 📊 Analytics & Insights
- **Performance Prediction**: Engagement and conversion forecasting
- **Cultural Scoring**: Real-time cultural relevance metrics
- **Platform Analytics**: Multi-platform performance tracking
- **Trend Analysis**: Cultural trend identification and integration

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for modern styling
- **Lucide React** for beautiful icons
- **Framer Motion** for smooth animations

### Backend
- **FastAPI** for high-performance API
- **Python 3.13** for AI services
- **Google Generative AI** (Gemini, Veo 3, Imagen 3)
- **Qloo Taste AI** for cultural intelligence
- **Tavily Search** for real-time data

### AI Services
- **Google Gemini 2.5 Flash** - Content analysis and enhancement
- **Google Veo 3** - Video generation
- **Google Imagen 3** - Image generation
- **Qloo Taste AI** - Cultural intelligence
- **Tavily Search API** - Web grounding and trends

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.13+
- API Keys:
  - Google Generative AI (Gemini, Veo 3, Imagen 3)
  - Qloo Taste AI
  - Tavily Search

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/nihalnihalani/Brand-AID-Alchemy.git
   cd Brand-AID-Alchemy
```

2. **Backend Setup**
```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
```bash
   cd frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create `backend/.env`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key
   QLOO_API_KEY=your_qloo_api_key
   TAVILY_API_KEY=your_tavily_api_key
   ```
   
   Create `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   GEMINI_API_KEY=your_gemini_api_key
   ```

5. **Run the Application**
   
   Backend (Terminal 1):
   ```bash
cd backend
   source venv/bin/activate
   python src/main.py
   ```
   
   Frontend (Terminal 2):
   ```bash
   cd frontend
npm run dev
```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## 📖 API Documentation

### Cultural Analysis
```http
POST /api/cultural/analyze
Content-Type: application/json

{
  "content": "luxury watch advertisement",
    "target_audience": "millennials",
    "analysis_type": "content"
}
```

### Video Generation
```http
POST /api/creative/video/generate
Content-Type: application/json

{
  "prompt": "A modern tech product showcase",
  "cultural_target": "millennials",
  "cultural_strength": 0.8
}
```

### Image Generation
```http
POST /api/creative/image/generate
Content-Type: application/json

{
  "prompt": "Luxury watch advertisement",
  "cultural_target": "millennials"
}
```

## 🎯 Key Features in Action

### Cultural Intelligence
- **74.4% Cultural Score**: Real-time cultural relevance analysis
- **Audience Profiling**: Millennial preferences and values
- **Trending Topics**: Sustainability, experiences, technology, wellness
- **Platform Optimization**: Instagram, Facebook, YouTube ready

### AI Generation
- **Enhanced Prompts**: Cultural intelligence integrated into AI prompts
- **Multi-Platform**: Optimized for different social media platforms
- **Performance Prediction**: 59.5% engagement rate forecasting
- **Brand Consistency**: Cross-platform visual coherence

## 🔧 Development

### Project Structure
```
ad-alchemy/
├── backend/
│   ├── src/
│   │   ├── api/routes/     # API endpoints
│   │   ├── services/       # AI services
│   │   ├── core/          # Configuration
│   │   └── main.py        # FastAPI app
│   └── requirements.txt
├── frontend/
│   ├── app/               # Next.js app router
│   ├── components/        # React components
│   └── package.json
└── docker-compose.yml
```

### Adding New Features
1. Create service in `backend/src/services/`
2. Add API route in `backend/src/api/routes/`
3. Create frontend component in `frontend/components/`
4. Add page in `frontend/app/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI** for Gemini, Veo 3, and Imagen 3
- **Qloo** for cultural intelligence API
- **Tavily** for search and grounding capabilities
- **Next.js** and **FastAPI** communities

## 📞 Support

For support, email support@adalchemy.ai or join our Discord community.

---

**Built with ❤️ by the AD Alchemy Team**

*Transforming advertising through AI-powered cultural intelligence*