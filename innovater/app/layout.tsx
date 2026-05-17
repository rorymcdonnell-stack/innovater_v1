import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InnovateR — Glanbia Performance Nutrition',
  description: 'AI-powered innovation platform. From idea to profit.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
