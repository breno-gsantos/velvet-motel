import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/shared/navbar'
import { Footer } from '@/components/shared/footer'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Velvet Stay | Motel Premium',
  description: 'Experiências exclusivas de hospedagem em um ambiente sofisticado e discreto. Suítes luxuosas, gastronomia refinada e momentos inesquecíveis.',
  keywords: ['motel', 'luxo', 'suítes', 'hospedagem', 'premium', 'romântico'],
  authors: [{ name: 'Velvet Stay' }],
  openGraph: {
    title: 'Velvet Stay | Motel Premium',
    description: 'Experiências exclusivas de hospedagem em um ambiente sofisticado e discreto.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1a1f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
