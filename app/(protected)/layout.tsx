import { Inter, Playfair_Display } from 'next/font/google'
import { Sidebar } from '@/components/dashboard/sidebar'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' })

export const metadata = {
  title: 'Dashboard | Velvet Stay',
  description: 'Painel administrativo do Velvet Stay',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${inter.className} ${playfair.variable}`}>
      <Sidebar />
      <main className="ml-64 min-h-screen bg-background transition-all duration-300">
        {children}
      </main>
    </div>
  )
}
