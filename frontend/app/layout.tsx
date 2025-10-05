import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'sonner'
import './globals.css'

export const metadata: Metadata = {
  title: 'AD Alchemy - AI-Powered Creative Intelligence Platform',
  description: 'Transform cultural insights into compelling video ads and creative content using AI-powered cultural intelligence and video generation.',
  keywords: ['AI', 'advertising', 'video generation', 'cultural intelligence', 'creative', 'marketing'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            {children}
          </div>
          <Toaster 
            position="top-right" 
            theme="dark"
            richColors
          />
        </ThemeProvider>
      </body>
    </html>
  )
}