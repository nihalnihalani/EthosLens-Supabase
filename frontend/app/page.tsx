'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  Video, 
  Brain, 
  Target, 
  Palette, 
  TrendingUp,
  ArrowRight,
  Play,
  Users,
  BarChart3,
  Zap,
  Star,
  Globe,
  Shield,
  Rocket,
  Infinity,
  Wand2,
  Layers,
  Cpu,
  Database,
  Lightbulb,
  Award,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ChevronRight,
  Eye,
  MousePointer,
  Code,
  Image as ImageIcon,
  Film,
  Mic,
  Monitor
} from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Brain,
    title: 'Cultural Intelligence',
    description: 'Advanced AI analyzes audience preferences, cultural nuances, and trending topics to create content that truly resonates with your target demographics.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    stats: { accuracy: '94%', markets: '50+' }
  },
  {
    icon: Video,
    title: 'AI Video Generation',
    description: 'Create stunning, professional videos using cutting-edge Veo 3 and Imagen technology with just a text prompt and cultural context.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    stats: { quality: '4K', speed: '2min' }
  },
  {
    icon: Target,
    title: 'Precision Targeting',
    description: 'Generate hyper-targeted content that speaks directly to your audience with cultural and demographic precision using real-time data.',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    stats: { engagement: '+67%', conversion: '+45%' }
  },
  {
    icon: Palette,
    title: 'Creative Studio',
    description: 'All-in-one workspace for ideation, generation, optimization, and collaboration with your creative team in real-time.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    stats: { templates: '500+', formats: '20+' }
  }
]

const capabilities = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate content in seconds, not hours',
    stat: '10x Faster',
    color: 'text-yellow-400'
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Professional-grade outputs every time',
    stat: '99.9% Uptime',
    color: 'text-blue-400'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Support for 50+ languages and cultures',
    stat: '50+ Languages',
    color: 'text-green-400'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security for your data',
    stat: 'SOC 2 Compliant',
    color: 'text-purple-400'
  }
]

const tools = [
  { icon: Film, name: 'Video Generation', description: 'Create stunning videos' },
  { icon: ImageIcon, name: 'Image Creation', description: 'Generate beautiful visuals' },
  { icon: Mic, name: 'Audio Production', description: 'Craft perfect soundtracks' },
  { icon: Code, name: 'Code Generation', description: 'Build interactive elements' },
  { icon: Monitor, name: 'Web Design', description: 'Design responsive layouts' },
  { icon: MousePointer, name: 'UI/UX Design', description: 'Create intuitive interfaces' }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Creative Director',
    company: 'TechCorp',
    content: 'AD Alchemy transformed our creative process. We went from weeks to hours for campaign creation.',
    avatar: 'SC'
  },
  {
    name: 'Marcus Johnson',
    role: 'Marketing Lead',
    company: 'StartupXYZ',
    content: 'The cultural intelligence feature is game-changing. Our engagement rates increased by 300%.',
    avatar: 'MJ'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Brand Manager',
    company: 'GlobalBrand',
    content: 'Finally, a tool that understands cultural nuances. Our international campaigns are now perfectly localized.',
    avatar: 'ER'
  }
]

const stats = [
  { label: 'Cultural Data Points', value: '10M+' },
  { label: 'Videos Generated', value: '50K+' },
  { label: 'Accuracy Rate', value: '94%' },
  { label: 'Time Saved', value: '80%' }
]

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Modern background with grid pattern */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-tl from-indigo-600/20 via-transparent to-cyan-600/10" />
        
        {/* Animated orbs */}
        {isClient && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
                scale: [1, 0.8, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
              animate={{
                x: [0, 60, 0],
                y: [0, -40, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="relative z-20 pt-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">AD Alchemy</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="hidden md:flex items-center space-x-8"
            >
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#tools" className="text-gray-300 hover:text-white transition-colors">Tools</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Sign In
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Badge className="mb-6 px-4 py-2 bg-blue-500/10 text-blue-400 border-blue-500/20">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Creative Intelligence
                </Badge>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="text-white">Transform</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                  Cultural Insights
                </span>
                <br />
                <span className="text-white">into</span>
                <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                  Compelling Ads
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-300 leading-relaxed max-w-2xl"
              >
                Create culturally-intelligent video advertisements that resonate with your audience using advanced AI technology. 
                From concept to creation in minutes, not months.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <Rocket className="w-5 h-5 mr-3" />
                    Start Creating Free
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                
                <Button variant="outline" className="px-8 py-4 text-lg border-white/20 text-white hover:bg-white/10 rounded-xl">
                  <Play className="w-5 h-5 mr-3" />
                  Watch Demo
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="grid grid-cols-3 gap-8 pt-8"
              >
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Visual Demo */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                {/* Mock video player */}
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
                  <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                    <p className="text-white/80 text-sm">AI-Generated Video Preview</p>
                  </div>
                </div>
                
                {/* Mock controls */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Cultural Alignment</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full" />
                      </div>
                      <span className="text-green-400 text-sm font-semibold">94%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Audience Match</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full" />
                      </div>
                      <span className="text-blue-400 text-sm font-semibold">87%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 text-sm">Engagement Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="w-5/6 h-full bg-gradient-to-r from-purple-400 to-pink-500 rounded-full" />
                      </div>
                      <span className="text-purple-400 text-sm font-semibold">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Powerful</span>{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to create culturally-intelligent, high-converting video advertisements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105 cursor-pointer h-full">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} p-4 mb-6 group-hover:scale-110 transition-all duration-300`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Feature Stats */}
                  <div className="flex gap-4 mb-4">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="bg-white/5 rounded-lg px-3 py-2 text-center">
                        <div className="text-sm font-bold text-white">{value}</div>
                        <div className="text-xs text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-500 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Creative</span>{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                Tools
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to create stunning, culturally-intelligent content
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105 cursor-pointer text-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-3 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <tool.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-sm font-semibold text-white mb-2">
                    {tool.name}
                  </h3>
                  
                  <p className="text-xs text-gray-400">
                    {tool.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">What Our</span>{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Users Say
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of creators who are transforming their workflow with AD Alchemy
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group-hover:scale-105 cursor-pointer h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      <p className="text-blue-400 text-sm">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-8">
                  <span className="text-white">Ready to Transform</span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Your Advertising?
                  </span>
                </h3>
                
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of creators who are already using AD Alchemy to create culturally-intelligent content that converts.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link href="/dashboard">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <Rocket className="w-5 h-5 mr-3" />
                      Start Creating Free
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  
                  <Button variant="outline" className="px-12 py-6 text-lg border-white/20 text-white hover:bg-white/10 rounded-xl">
                    <Eye className="w-5 h-5 mr-3" />
                    View Examples
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 relative z-10 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AD Alchemy</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transform cultural insights into compelling video advertisements with AI-powered creative intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 AD Alchemy. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}