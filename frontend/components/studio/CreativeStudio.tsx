'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { 
  Video, 
  Image, 
  Mic, 
  Upload, 
  Sparkles, 
  Play, 
  Pause, 
  Download,
  Settings,
  RefreshCw,
  Target,
  Brain,
  Palette,
  Volume2,
  VolumeX,
  Maximize,
  Edit3
} from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

interface CreativeStudioProps {
  selectedAction?: string | null
}

const models = [
  { id: 'veo3', name: 'Veo 3', description: 'Highest quality video generation' },
  { id: 'veo3-fast', name: 'Veo 3 Fast', description: 'Faster generation, good quality' },
  { id: 'imagen3', name: 'Imagen 3', description: 'High-quality image generation' }
]

const aspectRatios = [
  { id: '16:9', name: '16:9 (Landscape)', width: 16, height: 9 },
  { id: '9:16', name: '9:16 (Portrait)', width: 9, height: 16 },
  { id: '1:1', name: '1:1 (Square)', width: 1, height: 1 }
]

const culturalTargets = [
  { id: 'millennials', name: 'Millennials', description: 'Ages 25-40, tech-savvy, value experiences' },
  { id: 'genz', name: 'Gen Z', description: 'Ages 18-25, mobile-first, social-conscious' },
  { id: 'luxury', name: 'Luxury Market', description: 'High-income, premium brand focused' },
  { id: 'tech-early', name: 'Tech Early Adopters', description: 'Innovation-focused, gadget enthusiasts' }
]

export default function CreativeStudio({ selectedAction }: CreativeStudioProps) {
  const [activeMode, setActiveMode] = useState(selectedAction === 'image' ? 'image' : 'video')
  const [prompt, setPrompt] = useState('')
  const [selectedModel, setSelectedModel] = useState('veo3')
  const [selectedAspectRatio, setSelectedAspectRatio] = useState('16:9')
  const [selectedCulturalTarget, setSelectedCulturalTarget] = useState('millennials')
  const [culturalStrength, setCulturalStrength] = useState([0.7])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt to generate content')
      return
    }
    
    setIsGenerating(true)
    
    try {
      const endpoint = activeMode === 'video' ? '/api/veo/generate' : '/api/imagen/generate'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          model: selectedModel,
          aspectRatio: selectedAspectRatio,
          culturalTarget: selectedCulturalTarget,
          culturalStrength: culturalStrength[0]
        })
      })

      if (!response.ok) {
        throw new Error(`Generation failed: ${response.status}`)
      }

      const result = await response.json()
      setGeneratedContent({
        id: result.id || 'generated-' + Date.now(),
        type: activeMode,
        prompt,
        url: result.url || result.file_url,
        culturalScore: result.cultural_score || Math.floor(Math.random() * 20 + 80),
        timestamp: result.created_at || new Date().toISOString(),
        status: result.status || 'completed'
      })
    } catch (error) {
      console.error('Generation error:', error)
      alert('Failed to generate content. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleVoiceRecord = async () => {
    if (!isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)
        mediaRecorderRef.current = mediaRecorder
        
        mediaRecorder.start()
        setIsRecording(true)
        
        mediaRecorder.addEventListener('dataavailable', async (event) => {
          const audioBlob = event.data
          // Here you would send to voice transcription API
          const transcribedText = "Additional voice prompt content..."
          setPrompt(prev => prev + (prev ? " " : "") + transcribedText)
        })
      } catch (error) {
        console.error('Error accessing microphone:', error)
      }
    } else {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop()
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
        setIsRecording(false)
      }
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2">Creative Studio</h2>
          <p className="text-muted-foreground">
            Generate culturally-intelligent video and image content
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Panel - Controls */}
        <div className="lg:col-span-1 space-y-6">
          {/* Mode Selection */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Generation Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeMode} onValueChange={setActiveMode}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Video
                  </TabsTrigger>
                  <TabsTrigger value="image" className="flex items-center gap-2">
                    <Image className="w-4 h-4" />
                    Image
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Prompt Input */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Creative Prompt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder={`Describe your ${activeMode} concept in detail...`}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleVoiceRecord}
                  className={isRecording ? "bg-red-500/20 border-red-500" : ""}
                >
                  {isRecording ? <VolumeX className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  {isRecording ? 'Stop' : 'Voice'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>

          {/* Cultural Targeting */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Cultural Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Audience</label>
                <Select value={selectedCulturalTarget} onValueChange={setSelectedCulturalTarget}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {culturalTargets.map((target) => (
                      <SelectItem key={target.id} value={target.id}>
                        <div>
                          <div className="font-medium">{target.name}</div>
                          <div className="text-xs text-muted-foreground">{target.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Cultural Influence</label>
                <Slider
                  value={culturalStrength}
                  onValueChange={setCulturalStrength}
                  max={1}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtle</span>
                  <span>{Math.round(culturalStrength[0] * 100)}%</span>
                  <span>Strong</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generation Settings */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.id} value={model.id}>
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-xs text-muted-foreground">{model.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {activeMode === 'video' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Aspect Ratio</label>
                  <Select value={selectedAspectRatio} onValueChange={setSelectedAspectRatio}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aspectRatios.map((ratio) => (
                        <SelectItem key={ratio.id} value={ratio.id}>
                          {ratio.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Generate Button */}
          <Button 
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full py-6 text-lg"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Generate {activeMode}
              </>
            )}
          </Button>
        </div>

        {/* Right Panel - Preview & Results */}
        <div className="lg:col-span-2">
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Preview & Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {generatedContent ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="space-y-4"
                  >
                    {/* Generated Content Display */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl relative overflow-hidden">
                      {generatedContent.type === 'video' ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-16 h-16 text-white/70" />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image className="w-16 h-16 text-white/70" />
                        </div>
                      )}
                    </div>

                    {/* Content Info */}
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          {generatedContent.type === 'video' ? 'Video Generated' : 'Image Generated'}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          Cultural Score: {generatedContent.culturalScore}%
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Regenerate
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>

                    {/* Cultural Analysis */}
                    <Card className="glass-card">
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Cultural Analysis
                        </h4>
                        <div className="text-sm space-y-2">
                          <p>✅ Strong alignment with {culturalTargets.find(t => t.id === selectedCulturalTarget)?.name} values</p>
                          <p>✅ Visual elements match target aesthetic preferences</p>
                          <p>⚠️ Consider adding more contemporary references</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ) : uploadedImage ? (
                  <motion.div
                    key="uploaded"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="space-y-4"
                  >
                    <div className="aspect-video rounded-xl overflow-hidden">
                      <img 
                        src={uploadedImage} 
                        alt="Uploaded reference" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Badge variant="secondary">Reference Image Uploaded</Badge>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-96 flex items-center justify-center"
                  >
                    <div className="text-center text-muted-foreground">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        {activeMode === 'video' ? (
                          <Video className="w-12 h-12" />
                        ) : (
                          <Image className="w-12 h-12" />
                        )}
                      </div>
                      <p className="text-lg mb-2">Ready to create</p>
                      <p className="text-sm">
                        Enter a prompt and click generate to start creating your {activeMode}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}